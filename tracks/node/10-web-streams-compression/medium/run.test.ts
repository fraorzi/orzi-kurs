import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("mostek Node → Web Streams", () => {
  it("transformuje treść klasycznego Readable na uppercase", async () => {
    await expect(solve(Readable.from(["ala ", "ma ", "kota"]))).resolves.toBe(
      "ALA MA KOTA",
    );
  });

  it("obsługuje wiele chunków i polskie znaki", async () => {
    await expect(solve(Readable.from(["żół", "ty ", "łoś"]))).resolves.toBe(
      "ŻÓŁTY ŁOŚ",
    );
  });

  it("puste źródło daje pusty string", async () => {
    await expect(solve(Readable.from([]))).resolves.toBe("");
  });

  it("pojedynczy wielki chunk przechodzi w całości", async () => {
    const text = "x".repeat(10_000);
    await expect(solve(Readable.from([text]))).resolves.toBe(
      text.toUpperCase(),
    );
  });
});
