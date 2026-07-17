import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findSolution, findStarter, readArtifactText } from "./paths";
import { collectTypecheckFiles } from "./typecheck";

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("MySQL task harness", () => {
  it("discovers SQL starters and solutions as editable artifacts", () => {
    const task = mkdtempSync(join(tmpdir(), "orzi-mysql-harness-"));
    temporaryDirectories.push(task);
    writeFileSync(join(task, "starter.sql"), "SELECT 1;\n");
    writeFileSync(join(task, "_solution.sql"), "SELECT 42;\n");

    expect(findStarter(task)).toBe(join(task, "starter.sql"));
    expect(findSolution(task)).toBe(join(task, "_solution.sql"));
    expect(readArtifactText(findSolution(task)!)).toBe("SELECT 42;\n");
    expect(collectTypecheckFiles(task)).toEqual([]);
  });
});
