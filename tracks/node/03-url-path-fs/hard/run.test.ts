import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zapisz plik atomowo", () => {
  it("spełnia kontrakt zadania", async () => {
    const { mkdtemp, readFile, rm } = await import("node:fs/promises");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const dir = await mkdtemp(join(tmpdir(), "orzi-node-"));
    try {
      const file = join(dir, "state.json");
      await solve(file, '{"ok":true}');
      expect(await readFile(file, "utf8")).toBe('{"ok":true}');
    } finally {
      await rm(dir, { recursive: true });
    }
  });
});
