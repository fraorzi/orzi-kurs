import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { restoreStarterCodeInRepo } from "./starter-template";

const temporaryRepos: string[] = [];

function createRepo(files: Record<string, string>): string {
  const repoRoot = mkdtempSync(join(tmpdir(), "orzi-starter-reset-"));
  temporaryRepos.push(repoRoot);

  execFileSync("git", ["init", "-q", repoRoot]);
  for (const [relativePath, content] of Object.entries(files)) {
    const path = join(repoRoot, relativePath);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, "utf8");
  }
  execFileSync("git", ["-C", repoRoot, "add", "."]);
  execFileSync("git", [
    "-C",
    repoRoot,
    "-c",
    "user.name=orzi-test",
    "-c",
    "user.email=orzi-test@example.com",
    "commit",
    "-qm",
    "starter template",
  ]);
  return repoRoot;
}

afterEach(() => {
  for (const repoRoot of temporaryRepos.splice(0)) {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

describe("restoreStarterCodeInRepo", () => {
  it("restores a single-file starter and keeps the edited version as a backup", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const starterPath = join(repoRoot, "tracks/js/01-functions/easy/starter.js");
    writeFileSync(starterPath, "export const answer = 42;\n", "utf8");

    const result = restoreStarterCodeInRepo("js/01-functions/easy", repoRoot);

    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 0;\n");
    expect(result.backupRel).not.toBeNull();
    expect(readFileSync(join(repoRoot, result.backupRel!), "utf8"))
      .toBe("export const answer = 42;\n");
  });

  it("restores the complete src tree and backs up extra student files", () => {
    const repoRoot = createRepo({
      "tracks/js/module-01/module/src/index.js": "export { createStore } from './store.js';\n",
      "tracks/js/module-01/module/src/store.js": "export function createStore() {}\n",
    });
    const srcPath = join(repoRoot, "tracks/js/module-01/module/src");
    writeFileSync(join(srcPath, "store.js"), "export function createStore() { return 42; }\n", "utf8");
    writeFileSync(join(srcPath, "notes.js"), "student notes\n", "utf8");

    const result = restoreStarterCodeInRepo("js/module-01/module", repoRoot);

    expect(readFileSync(join(srcPath, "store.js"), "utf8"))
      .toBe("export function createStore() {}\n");
    expect(existsSync(join(srcPath, "notes.js"))).toBe(false);
    expect(readFileSync(join(repoRoot, result.backupRel!, "notes.js"), "utf8"))
      .toBe("student notes\n");
  });
});
