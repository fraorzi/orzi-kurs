import {
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";
import { vitestEnvironmentForTask } from "./runner";
import { collectTypecheckFiles } from "./typecheck";

const temporaryDirectories: string[] = [];

function temporaryTask(): string {
  const directory = mkdtempSync(join(tmpdir(), "orzi-react-harness-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("React task harness", () => {
  it("discovers single-file TSX starters and solutions", () => {
    const task = temporaryTask();
    writeFileSync(join(task, "starter.tsx"), "export const value = <p />;\n");
    writeFileSync(join(task, "_solution.tsx"), "export const value = <p />;\n");

    expect(findStarter(task)).toBe(join(task, "starter.tsx"));
    expect(findSolution(task)).toBe(join(task, "_solution.tsx"));
  });

  it("includes TSX source and tests in the strict typecheck gate", () => {
    const task = temporaryTask();
    writeFileSync(join(task, "starter.tsx"), "export const value = <p />;\n");
    writeFileSync(
      join(task, "run.test.tsx"),
      "import { value } from './starter'; void value;\n",
    );

    expect(
      collectTypecheckFiles(task).map((path) => path.split("/").at(-1)),
    ).toEqual(["run.test.tsx", "starter.tsx"]);
  });

  it("uses jsdom for the React track and node elsewhere", () => {
    expect(vitestEnvironmentForTask(join(TRACKS_ROOT, "react/01/easy")))
      .toBe("jsdom");
    expect(vitestEnvironmentForTask(join(TRACKS_ROOT, "ts/01/easy")))
      .toBe("node");
  });
});
