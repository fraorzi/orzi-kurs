import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { retry, allSettledLite } from "./starter.js";

describe("retry", () => {
  it("zwraca wynik pierwszej udanej próby", async () => {
    let calls = 0;
    const flaky = () => {
      calls++;
      return calls < 3 ? Promise.reject(new Error("boom")) : Promise.resolve("ok");
    };
    await expect(retry(flaky, 5)).resolves.toBe("ok");
    expect(calls, "po sukcesie nie wolno wywoływać fn ponownie").toBe(3);
  });

  it("sukces za pierwszym razem = dokładnie jedno wywołanie", async () => {
    let calls = 0;
    const fine = () => {
      calls++;
      return Promise.resolve(42);
    };
    await expect(retry(fine, 3)).resolves.toBe(42);
    expect(calls).toBe(1);
  });

  it("po wyczerpaniu prób odrzuca ostatnim błędem", async () => {
    let calls = 0;
    const failing = () => {
      calls++;
      return Promise.reject(new Error(`fail ${calls}`));
    };
    await expect(
      retry(failing, 3),
      "po attempts nieudanych próbach promise ma być odrzucony OSTATNIM błędem",
    ).rejects.toThrow("fail 3");
    expect(calls, "fn ma być wywołane dokładnie attempts razy").toBe(3);
  });
});

describe("allSettledLite", () => {
  it("nie używa wbudowanego Promise.allSettled", () => {
    const src = readFileSync(new URL("./starter.js", import.meta.url), "utf8");
    expect(
      src.includes("Promise.allSettled"),
      "celem zadania jest własna implementacja — nie wywołuj Promise.allSettled",
    ).toBe(false);
  });

  it("zbiera sukcesy i błędy w kolejności wejścia, nie odrzucając", async () => {
    const result = await allSettledLite([
      Promise.resolve(1),
      Promise.reject(new Error("x")),
      Promise.resolve(3),
    ]);
    expect(result).toEqual([
      { status: "fulfilled", value: 1 },
      { status: "rejected", reason: new Error("x") },
      { status: "fulfilled", value: 3 },
    ]);
  });

  it("kolejność wyników odpowiada wejściu niezależnie od czasu zakończenia", async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 60));
    const fast = Promise.resolve("fast");
    const result = await allSettledLite([slow, fast]);
    expect(
      result.map((r) => r.value),
      "wynik[0] ma odpowiadać wejściu[0], nawet jeśli skończył się później",
    ).toEqual(["slow", "fast"]);
  });

  it("wartości nie będące promisami traktuje jak rozwiązane", async () => {
    const result = await allSettledLite([7]);
    expect(result, "opakuj wejście w Promise.resolve — obsłuży i promisy, i zwykłe wartości").toEqual([
      { status: "fulfilled", value: 7 },
    ]);
  });

  it("pusta tablica daje pustą tablicę", async () => {
    await expect(allSettledLite([])).resolves.toEqual([]);
  });
});
