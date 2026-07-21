import { access, writeFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("fixture katalogu tymczasowego", () => {
  it("daje callbackowi istniejący katalog i zwraca jego wynik", async () => {
    const result = await solve(async (directory) => {
      await writeFile(`${directory}/plik.txt`, "dane");
      return "gotowe";
    });
    expect(result).toBe("gotowe");
  });

  it("usuwa katalog po sukcesie", async () => {
    let captured = "";
    await solve(async (directory) => {
      captured = directory;
    });
    await expect(access(captured)).rejects.toThrow();
  });

  it("usuwa katalog także po wyjątku i propaguje błąd", async () => {
    let captured = "";
    await expect(
      solve(async (directory) => {
        captured = directory;
        throw new Error("test padł");
      }),
    ).rejects.toThrow("test padł");
    await expect(access(captured)).rejects.toThrow();
  });

  it("każde wywołanie dostaje inny katalog", async () => {
    const dirs: string[] = [];
    await solve(async (d) => void dirs.push(d));
    await solve(async (d) => void dirs.push(d));
    expect(dirs[0]).not.toBe(dirs[1]);
  });
});
