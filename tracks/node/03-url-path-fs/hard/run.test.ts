import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { solve } from "./starter";

let directory: string;

afterEach(async () => {
  if (directory) await rm(directory, { recursive: true, force: true });
});

async function fixture(): Promise<string> {
  directory = await mkdtemp(join(tmpdir(), "orzi-atomic-"));
  return directory;
}

describe("zapis atomowy", () => {
  it("zapisuje treść i nie zostawia pliku tymczasowego", async () => {
    const dir = await fixture();
    const target = join(dir, "state.json");
    await solve(target, '{"ok":true}');
    expect(await readFile(target, "utf8")).toBe('{"ok":true}');
    expect(await readdir(dir)).toEqual(["state.json"]);
  });

  it("nadpisuje istniejący cel nową treścią", async () => {
    const dir = await fixture();
    const target = join(dir, "state.json");
    await writeFile(target, "stara");
    await solve(target, "nowa");
    expect(await readFile(target, "utf8")).toBe("nowa");
  });

  it("po błędzie rename sprząta plik tymczasowy i propaguje błąd", async () => {
    const dir = await fixture();
    const target = join(dir, "state.json");
    await mkdir(target);
    await expect(solve(target, "treść")).rejects.toThrow();
    const entries = await readdir(dir);
    expect(entries.filter((name) => name.endsWith(".tmp"))).toEqual([]);
  });

  it("nie nadpisuje cudzego pliku tymczasowego (flaga wx)", async () => {
    const dir = await fixture();
    const target = join(dir, "state.json");
    await writeFile(`${target}.${process.pid}.tmp`, "cudzy");
    await expect(solve(target, "treść")).rejects.toThrow();
  });
});
