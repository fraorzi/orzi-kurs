import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const NODE_ROOT = join(TRACKS_ROOT, "node");

function directories(path: string): string[] {
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter((candidate) => statSync(candidate).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

function taskDirectories(path: string): string[] {
  const tasks: string[] = [];
  for (const directory of directories(path)) {
    if (existsSync(join(directory, "task.md"))) tasks.push(directory);
    else tasks.push(...taskDirectories(directory));
  }
  return tasks;
}

describe("Node content contract", () => {
  it("keeps usage guidance, pitfalls and Node 24 sources", () => {
    if (!existsSync(NODE_ROOT)) return;

    for (const topic of directories(NODE_ROOT).filter(
      (directory) => !directory.split("/").at(-1)?.startsWith("module-"),
    )) {
      const readmePath = join(topic, "README.md");
      expect(existsSync(readmePath), `${topic} nie ma README.md`).toBe(true);
      const readme = readFileSync(readmePath, "utf8");
      expect(readme, `${readmePath} nie wyjaśnia zastosowań`).toMatch(
        /^## Kiedy/m,
      );
      expect(readme, `${readmePath} nie opisuje pułapek`).toMatch(
        /^## .*Pułapk/im,
      );
      expect(readme, `${readmePath} nie podaje źródeł`).toMatch(/^## Źródła/m);
      expect(
        readme,
        `${readmePath} nie wskazuje dokumentacji Node 24`,
      ).toContain("latest-v24.x/docs/api");
    }
  });

  it("keeps every task typed, solvable and covered by a local test", () => {
    if (!existsSync(NODE_ROOT)) return;

    for (const task of taskDirectories(NODE_ROOT)) {
      const starter = findStarter(task);
      const solution = findSolution(task);
      expect(starter, `${task} nie ma startera`).not.toBeNull();
      expect(solution, `${task} nie ma rozwiązania`).not.toBeNull();
      expect(extname(starter ?? ""), `${task} ma używać TypeScript`).toBe(
        ".ts",
      );
      expect(extname(solution ?? ""), `${task} ma używać TypeScript`).toBe(
        ".ts",
      );
      expect(
        existsSync(join(task, "run.test.ts")),
        `${task} nie ma run.test.ts`,
      ).toBe(true);

      const hintsPath = join(task, "hints.md");
      expect(existsSync(hintsPath), `${task} nie ma hints.md`).toBe(true);
      expect(
        readFileSync(hintsPath, "utf8").match(/^## Hint \d+/gm)?.length ?? 0,
        `${task} powinien mieć co najmniej dwa progresywne hinty`,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});
