import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("pipeline NDJSON uppercase", () => {
  it("transformuje linie i zachowuje separator", async () => {
    await expect(solve(["ala\nma\n", "kota\n"])).resolves.toBe(
      "ALA\nMA\nKOTA\n",
    );
  });

  it("skleja linię przeciętą między chunkami", async () => {
    await expect(solve(["po", "łow", "a\ncałość\n"])).resolves.toBe(
      "POŁOWA\nCAŁOŚĆ\n",
    );
  });

  it("pomija linie puste i złożone z białych znaków", async () => {
    await expect(solve(["a\n\n  \nb\n"])).resolves.toBe("A\nB\n");
  });

  it("flush wydaje ostatnią linię bez trailing newline", async () => {
    await expect(solve(["x\nreszta"])).resolves.toBe("X\nRESZTA");
  });

  it("puste wejście daje pusty wynik", async () => {
    await expect(solve([])).resolves.toBe("");
  });
});
