import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Buduj argv bez shella", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(solve("in/a.jpg", "out/a.webp", "webp")).toEqual({
      file: "img-tool",
      args: [
        "--input",
        "in/a.jpg",
        "--output",
        "out/a.webp",
        "--format",
        "webp",
      ],
      shell: false,
    });
    expect(() => solve("a;rm", "b", "png")).toThrow(/ścieżka/);
  });
});
