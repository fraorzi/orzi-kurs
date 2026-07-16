import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const JS_ROOT = join(TRACKS_ROOT, "js");

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

describe("JavaScript content contract", () => {
  it("keeps a README with usage and pitfalls for every visible topic", () => {
    for (const topic of directories(JS_ROOT)) {
      const readmePath = join(topic, "README.md");
      expect(existsSync(readmePath), `${topic} nie ma README.md`).toBe(true);
      const readme = readFileSync(readmePath, "utf8");
      expect(readme, `${readmePath} nie wyjaśnia, kiedy stosować temat`)
        .toMatch(/^## Kiedy/m);
      expect(readme, `${readmePath} nie opisuje pułapek`)
        .toMatch(/^## .*Pułapk/im);
    }
  });

  it("keeps every task runnable, solvable and equipped with progressive hints", () => {
    for (const task of taskDirectories(JS_ROOT)) {
      expect(findStarter(task), `${task} nie ma startera`).not.toBeNull();
      expect(findSolution(task), `${task} nie ma rozwiązania wzorcowego`).not.toBeNull();
      expect(existsSync(join(task, "run.test.js")), `${task} nie ma run.test.js`).toBe(true);
      const hintsPath = join(task, "hints.md");
      expect(existsSync(hintsPath), `${task} nie ma hints.md`).toBe(true);
      expect(
        readFileSync(hintsPath, "utf8").match(/^## Hint \d+/gm)?.length ?? 0,
        `${task} powinien mieć co najmniej dwa progresywne hinty`,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});
