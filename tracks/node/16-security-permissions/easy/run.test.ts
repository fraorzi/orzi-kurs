import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zbuduj minimalne flagi permissions", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve("app.ts", { read: ["./config"], write: ["./data"], worker: true }),
    ).toEqual([
      "--permission",
      "--allow-fs-read=./config",
      "--allow-fs-write=./data",
      "--allow-worker",
      "app.ts",
    ]);
    expect(solve("app.ts", {})).not.toContain("--allow-fs-read=*");
  });
});
