import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findSolution, findStarter, TRACKS_ROOT } from "./paths";

const ROOT = join(TRACKS_ROOT, "java");
function dirs(path: string): string[] {
  return readdirSync(path).map((name) => join(path, name))
    .filter((candidate) => statSync(candidate).isDirectory()).sort();
}

describe("Java content contract", () => {
  it("keeps subject, use cases, traps and Java 25 sources", () => {
    if (!existsSync(ROOT)) return;
    for (const topic of dirs(ROOT)) {
      const readme = readFileSync(join(topic, "README.md"), "utf8");
      expect(readme).toMatch(/^## Grupa/m);
      expect(readme).toMatch(/^## Kiedy/m);
      expect(readme).toMatch(/^## Pułapki/m);
      expect(readme).toContain("docs.oracle.com/en/java/javase/25");
    }
  });

  it("keeps each task compilable through the Java adapter", () => {
    if (!existsSync(ROOT)) return;
    for (const topic of dirs(ROOT)) {
      for (const task of dirs(topic).filter((dir) => existsSync(join(dir, "task.md")))) {
        expect(findStarter(task)?.endsWith("starter.java")).toBe(true);
        expect(findSolution(task)?.endsWith("_solution.java")).toBe(true);
        expect(existsSync(join(task, "run.test.ts"))).toBe(true);
        expect(readFileSync(join(task, "run.test.ts"), "utf8")).toContain("runJavaTask");
        expect(readFileSync(join(task, "hints.md"), "utf8").match(/^## Hint \d+/gm)?.length ?? 0)
          .toBeGreaterThanOrEqual(2);
      }
    }
  });
});
