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
  it("keeps a real README: usage, pitfalls and Node 24 sources", () => {
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
      expect(
        readme.split("\n").length,
        `${readmePath} jest szkieletem — README ma tłumaczyć model mentalny`,
      ).toBeGreaterThanOrEqual(30);
    }
  });

  it("keeps every task typed, solvable and behaviourally tested", () => {
    if (!existsSync(NODE_ROOT)) return;

    for (const task of taskDirectories(NODE_ROOT)) {
      const starter = findStarter(task);
      const solution = findSolution(task);
      expect(starter, `${task} nie ma startera`).not.toBeNull();
      expect(solution, `${task} nie ma rozwiązania`).not.toBeNull();

      const multiFile = starter !== null && statSync(starter).isDirectory();
      if (multiFile) {
        expect(
          existsSync(join(task, "src/index.ts")),
          `${task} nie ma publicznej granicy src/index.ts`,
        ).toBe(true);
        expect(
          existsSync(join(task, "_solution/index.ts")),
          `${task} nie ma rozwiązania wieloplikowego`,
        ).toBe(true);
      } else {
        expect(extname(starter ?? ""), `${task} ma używać TypeScript`).toBe(".ts");
        expect(extname(solution ?? ""), `${task} ma używać TypeScript`).toBe(".ts");
      }

      const testPath = join(task, "run.test.ts");
      expect(existsSync(testPath), `${task} nie ma run.test.ts`).toBe(true);
      const testCount =
        readFileSync(testPath, "utf8").match(/^\s*it\(/gm)?.length ?? 0;
      const minimum = multiFile ? 6 : 3;
      expect(
        testCount,
        `${task} ma ${testCount} testów; wymagane co najmniej ${minimum} testów zachowania`,
      ).toBeGreaterThanOrEqual(minimum);

      const hintsPath = join(task, "hints.md");
      expect(existsSync(hintsPath), `${task} nie ma hints.md`).toBe(true);
      expect(
        readFileSync(hintsPath, "utf8").match(/^## Hint \d+/gm)?.length ?? 0,
        `${task} powinien mieć co najmniej trzy progresywne hinty`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps hints task-specific — no copy-pasted hint files", () => {
    if (!existsSync(NODE_ROOT)) return;

    const seen = new Map<string, string>();
    for (const task of taskDirectories(NODE_ROOT)) {
      const hints = readFileSync(join(task, "hints.md"), "utf8").trim();
      const previous = seen.get(hints);
      expect(
        previous,
        `hints.md w ${task} jest kopią ${previous ?? ""} — hinty mają być specyficzne dla zadania`,
      ).toBeUndefined();
      seen.set(hints, task);
    }
  });

  it("keeps [quality] gates in every optimization task", () => {
    const optimizeRoot = join(NODE_ROOT, "18-debug-optimize-node");
    if (!existsSync(optimizeRoot)) return;

    for (const task of taskDirectories(optimizeRoot)) {
      const test = readFileSync(join(task, "run.test.ts"), "utf8");
      expect(
        test.includes("[quality]"),
        `${task} jest zadaniem [O] i wymaga testów oznaczonych [quality]`,
      ).toBe(true);
    }
  });
});
