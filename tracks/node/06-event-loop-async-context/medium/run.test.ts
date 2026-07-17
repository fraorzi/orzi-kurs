import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("budżet mikrotasków", () => {
  it("wykonuje całą pracę i liczy yieldy między partiami", async () => {
    await expect(solve(10, 4)).resolves.toEqual({ completed: 10, yields: 2 });
  });

  it("nie yielduje po ostatniej partii", async () => {
    await expect(solve(4, 4)).resolves.toEqual({ completed: 4, yields: 0 });
    await expect(solve(8, 4)).resolves.toEqual({ completed: 8, yields: 1 });
  });

  it("budżet większy niż praca oznacza zero yieldów", async () => {
    await expect(solve(3, 100)).resolves.toEqual({ completed: 3, yields: 0 });
  });

  it("zero pracy kończy się natychmiast", async () => {
    await expect(solve(0, 4)).resolves.toEqual({ completed: 0, yields: 0 });
  });

  it("odrzuca budżet mniejszy niż 1", async () => {
    await expect(solve(5, 0)).rejects.toThrow();
  });
});
