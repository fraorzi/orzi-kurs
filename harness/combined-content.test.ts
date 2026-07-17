import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const ROOT = join(TRACKS_ROOT, "combined");

function directories(path: string): string[] {
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter((candidate) => statSync(candidate).isDirectory())
    .sort();
}

describe("combined content contract", () => {
  it("keeps every project sourced and decision-oriented", () => {
    if (!existsSync(ROOT)) return;
    for (const topic of directories(ROOT)) {
      const readme = readFileSync(join(topic, "README.md"), "utf8");
      expect(readme).toMatch(/^## Kontekst/m);
      expect(readme).toMatch(/^## Decyzje/m);
      expect(readme).toMatch(/^## Źródła/m);
      expect(readme.match(/https:\/\//g)?.length ?? 0).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps all projects TypeScript-only and locally verifiable", () => {
    if (!existsSync(ROOT)) return;
    for (const topic of directories(ROOT)) {
      for (const task of directories(topic).filter((dir) => existsSync(join(dir, "task.md")))) {
        const starter = findStarter(task);
        const solution = findSolution(task);
        expect(starter).not.toBeNull();
        expect(solution).not.toBeNull();
        expect([".ts", ".tsx", ""]).toContain(extname(starter ?? ""));
        expect(existsSync(join(task, "run.test.ts")) || existsSync(join(task, "run.test.tsx")))
          .toBe(true);
        expect(readFileSync(join(task, "hints.md"), "utf8").match(/^## Hint \d+/gm)?.length ?? 0)
          .toBeGreaterThanOrEqual(2);
      }
    }
  });
});
