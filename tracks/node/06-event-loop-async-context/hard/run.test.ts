import { setTimeout as delay } from "node:timers/promises";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("kontekst żądania w AsyncLocalStorage", () => {
  it("udostępnia ID wewnątrz run i zwraca wynik fn", () => {
    const context = solve();
    const result = context.run("req-1", () => `widzę ${context.current()}`);
    expect(result).toBe("widzę req-1");
  });

  it("kontekst przeżywa await wewnątrz async fn", async () => {
    const context = solve();
    const result = await context.run("req-2", async () => {
      await delay(1);
      return context.current();
    });
    expect(result).toBe("req-2");
  });

  it("równoległe konteksty nie mieszają się", async () => {
    const context = solve();
    const results = await Promise.all([
      context.run("a", async () => {
        await delay(2);
        return context.current();
      }),
      context.run("b", async () => {
        await delay(1);
        return context.current();
      }),
    ]);
    expect(results).toEqual(["a", "b"]);
  });

  it("zagnieżdżony run przysłania kontekst tylko na swój czas", () => {
    const context = solve();
    context.run("outer", () => {
      expect(context.run("inner", () => context.current())).toBe("inner");
      expect(context.current()).toBe("outer");
    });
  });

  it("current poza kontekstem rzuca", () => {
    const context = solve();
    expect(() => context.current()).toThrow();
  });
});
