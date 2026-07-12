import { describe, it, expect } from "vitest";
import { loadName, loadTotal } from "./starter.js";

describe("loadName", () => {
  it("zwraca name użytkownika (po rozpakowaniu obietnicy)", async () => {
    await expect(
      loadName(async () => ({ name: "Ala" })),
      "bez await 'user' jest obietnicą, a user.name to undefined — dodaj await fetchUser()",
    ).resolves.toBe("Ala");
  });
});

describe("loadTotal", () => {
  it("sumuje dwie wartości pobrane asynchronicznie", async () => {
    await expect(
      loadTotal(async () => 2, async () => 3),
      "bez await drugiej wartości dodajesz liczbę do obietnicy — wynik nie jest 5",
    ).resolves.toBe(5);
  });

  it("działa też dla innych wartości", async () => {
    await expect(loadTotal(async () => 10, async () => -4)).resolves.toBe(6);
  });
});
