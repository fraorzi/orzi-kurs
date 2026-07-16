import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const REACT_ROOT = join(TRACKS_ROOT, "react");

function directories(path: string): string[] {
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter((candidate) => statSync(candidate).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

function taskDirectories(path: string): string[] {
  const tasks: string[] = [];
  for (const directory of directories(path)) {
    if (existsSync(join(directory, "task.md"))) {
      tasks.push(directory);
    } else {
      tasks.push(...taskDirectories(directory));
    }
  }
  return tasks;
}

describe("React content contract", () => {
  it("keeps usage guidance, pitfalls and sources for every lesson topic", () => {
    for (const topic of directories(REACT_ROOT).filter(
      (directory) => !directory.split("/").at(-1)?.startsWith("module-"),
    )) {
      const readmePath = join(topic, "README.md");
      expect(existsSync(readmePath), `${topic} nie ma README.md`).toBe(true);
      const readme = readFileSync(readmePath, "utf8");
      expect(readme, `${readmePath} nie wyjaśnia zastosowań`)
        .toMatch(/^## Kiedy/m);
      expect(readme, `${readmePath} nie opisuje pułapek`)
        .toMatch(/^## .*Pułapk/im);
      expect(readme, `${readmePath} nie podaje źródeł`)
        .toMatch(/^## Źródła/m);
    }
  });

  it("keeps every task solvable and tested through the React harness", () => {
    for (const task of taskDirectories(REACT_ROOT)) {
      expect(findStarter(task), `${task} nie ma startera`).not.toBeNull();
      expect(findSolution(task), `${task} nie ma rozwiązania`).not.toBeNull();

      const testPath = join(task, "run.test.tsx");
      expect(existsSync(testPath), `${task} nie ma run.test.tsx`).toBe(true);
      expect(
        readFileSync(testPath, "utf8"),
        `${testPath} powinien używać wspólnego helpera React`,
      ).toContain("@harness/react-test");

      const hintsPath = join(task, "hints.md");
      expect(existsSync(hintsPath), `${task} nie ma hints.md`).toBe(true);
      expect(
        readFileSync(hintsPath, "utf8").match(/^## Hint \d+/gm)?.length ?? 0,
        `${task} powinien mieć co najmniej dwa progresywne hinty`,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});
