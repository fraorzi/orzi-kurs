import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const MYSQL_ROOT = join(TRACKS_ROOT, "mysql");

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

describe("MySQL content contract", () => {
  it("keeps usage guidance, pitfalls and MySQL 8.4 sources", () => {
    if (!existsSync(MYSQL_ROOT)) return;

    for (const topic of directories(MYSQL_ROOT).filter(
      (directory) => !directory.split("/").at(-1)?.startsWith("module-"),
    )) {
      const readmePath = join(topic, "README.md");
      expect(existsSync(readmePath), `${topic} nie ma README.md`).toBe(true);
      const readme = readFileSync(readmePath, "utf8");
      expect(readme, `${readmePath} nie wyjaśnia zastosowań`).toMatch(/^## Kiedy/m);
      expect(readme, `${readmePath} nie opisuje pułapek`).toMatch(/^## .*Pułapk/im);
      expect(readme, `${readmePath} nie podaje źródeł`).toMatch(/^## Źródła/m);
      expect(readme, `${readmePath} nie wskazuje dokumentacji MySQL 8.4`)
        .toContain("dev.mysql.com/doc/refman/8.4");
      expect(
        readme.split("\n").length,
        `${readmePath} jest szkieletem — README ma tłumaczyć model mentalny`,
      ).toBeGreaterThanOrEqual(30);
    }
  });

  it("keeps every task solvable and covered by a local test", () => {
    if (!existsSync(MYSQL_ROOT)) return;

    for (const task of taskDirectories(MYSQL_ROOT)) {
      const starter = findStarter(task);
      const solution = findSolution(task);
      expect(starter, `${task} nie ma startera`).not.toBeNull();
      expect(solution, `${task} nie ma rozwiązania`).not.toBeNull();
      expect([".sql", ".ts", ""], `${task} ma nieobsługiwany artefakt`)
        .toContain(extname(starter ?? ""));
      expect(existsSync(join(task, "run.test.ts")), `${task} nie ma run.test.ts`)
        .toBe(true);

      const testCount =
        readFileSync(join(task, "run.test.ts"), "utf8").match(/^\s*it\(/gm)
          ?.length ?? 0;
      const multiFile = starter !== null && extname(starter) === "";
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
    if (!existsSync(MYSQL_ROOT)) return;

    const seen = new Map<string, string>();
    for (const task of taskDirectories(MYSQL_ROOT)) {
      const hints = readFileSync(join(task, "hints.md"), "utf8").trim();
      const previous = seen.get(hints);
      expect(
        previous,
        `hints.md w ${task} jest kopią ${previous ?? ""}`,
      ).toBeUndefined();
      seen.set(hints, task);
    }
  });

  it("keeps [quality] gates in the optimization topic", () => {
    const optimizeRoot = join(MYSQL_ROOT, "21b-optimize-query-plans");
    if (!existsSync(optimizeRoot)) return;

    for (const task of taskDirectories(optimizeRoot)) {
      expect(
        readFileSync(join(task, "run.test.ts"), "utf8").includes("[quality]"),
        `${task} jest zadaniem [O] i wymaga testów oznaczonych [quality]`,
      ).toBe(true);
    }
  });
});
