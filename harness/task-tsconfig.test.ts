import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { taskCompilerOptions } from "./typecheck";

const directories: string[] = [];

function taskDir(config?: unknown): string {
  const directory = mkdtempSync(join(tmpdir(), "orzi-task-tsconfig-"));
  directories.push(directory);
  if (config !== undefined) {
    writeFileSync(
      join(directory, "tsconfig.task.json"),
      JSON.stringify(config),
      "utf8",
    );
  }
  return directory;
}

afterEach(() => {
  for (const directory of directories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("taskCompilerOptions", () => {
  it("returns an empty override when a task has no local config", () => {
    expect(taskCompilerOptions(taskDir())).toEqual({});
  });

  it("accepts only the strictness flags supported by the task runner", () => {
    expect(
      taskCompilerOptions(
        taskDir({
          compilerOptions: {
            exactOptionalPropertyTypes: true,
            noUncheckedIndexedAccess: true,
            verbatimModuleSyntax: true,
          },
        }),
      ),
    ).toEqual({
      exactOptionalPropertyTypes: true,
      noUncheckedIndexedAccess: true,
      verbatimModuleSyntax: true,
    });
  });

  it("rejects options that could replace the runner's module or output policy", () => {
    expect(() =>
      taskCompilerOptions(
        taskDir({ compilerOptions: { noEmit: false } }),
      ),
    ).toThrow("niedozwolona opcja noEmit");
  });

  it("rejects non-boolean values", () => {
    expect(() =>
      taskCompilerOptions(
        taskDir({ compilerOptions: { noUncheckedIndexedAccess: "yes" } }),
      ),
    ).toThrow("musi być boolean");
  });
});
