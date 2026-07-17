import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Izoluj fixture katalogu", () => {
  it("spełnia kontrakt zadania", async () => {
    const { access } = await import("node:fs/promises");
    let path = "";
    await expect(
      solve(async (directory) => {
        path = directory;
        return 7;
      }),
    ).resolves.toBe(7);
    await expect(access(path)).rejects.toMatchObject({ code: "ENOENT" });
  });
});
