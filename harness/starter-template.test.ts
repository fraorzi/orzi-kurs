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
import {
  captureStarterSnapshotInRepo,
  restoreStarterCodeInRepo,
  restoreStarterSnapshotInRepo,
} from "./starter-template";

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

describe("starter reset and undo", () => {
  it("restores a single-file starter and can undo from a browser snapshot", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const starterPath = join(repoRoot, "tracks/js/01-functions/easy/starter.js");
    writeFileSync(starterPath, "export const answer = 42;\n", "utf8");

    const snapshot = captureStarterSnapshotInRepo("js/01-functions/easy", repoRoot);
    restoreStarterCodeInRepo("js/01-functions/easy", repoRoot);

    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 0;\n");
    restoreStarterSnapshotInRepo("js/01-functions/easy", snapshot!, repoRoot);
    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 42;\n");
  });

  it("restores the complete src tree including extra student files", () => {
    const repoRoot = createRepo({
      "tracks/js/module-01/module/src/index.js": "export { createStore } from './store.js';\n",
      "tracks/js/module-01/module/src/store.js": "export function createStore() {}\n",
    });
    const srcPath = join(repoRoot, "tracks/js/module-01/module/src");
    writeFileSync(join(srcPath, "store.js"), "export function createStore() { return 42; }\n", "utf8");
    writeFileSync(join(srcPath, "notes.js"), "student notes\n", "utf8");

    const snapshot = captureStarterSnapshotInRepo("js/module-01/module", repoRoot);
    restoreStarterCodeInRepo("js/module-01/module", repoRoot);

    expect(readFileSync(join(srcPath, "store.js"), "utf8"))
      .toBe("export function createStore() {}\n");
    expect(existsSync(join(srcPath, "notes.js"))).toBe(false);

    restoreStarterSnapshotInRepo("js/module-01/module", snapshot!, repoRoot);
    expect(readFileSync(join(srcPath, "store.js"), "utf8"))
      .toBe("export function createStore() { return 42; }\n");
    expect(readFileSync(join(srcPath, "notes.js"), "utf8")).toBe("student notes\n");
  });

  it("can undo restoring a starter that was previously deleted", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const starterPath = join(repoRoot, "tracks/js/01-functions/easy/starter.js");
    rmSync(starterPath);

    const snapshot = captureStarterSnapshotInRepo("js/01-functions/easy", repoRoot);
    expect(snapshot?.kind).toBe("missing");

    restoreStarterCodeInRepo("js/01-functions/easy", repoRoot);
    expect(existsSync(starterPath)).toBe(true);

    restoreStarterSnapshotInRepo("js/01-functions/easy", snapshot!, repoRoot);
    expect(existsSync(starterPath)).toBe(false);
  });

  it("rejects snapshot paths outside the starter before changing files", () => {
    const repoRoot = createRepo({
      "tracks/js/module-01/module/src/index.js": "export const answer = 0;\n",
    });
    const starterPath = join(repoRoot, "tracks/js/module-01/module/src/index.js");

    expect(() => restoreStarterSnapshotInRepo(
      "js/module-01/module",
      {
        artifactName: "src",
        kind: "directory",
        files: [{
          path: "../outside.js",
          contentBase64: Buffer.from("malicious\n").toString("base64"),
        }],
      },
      repoRoot,
    )).toThrow("nieprawidłowy plik w kopii startera");

    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 0;\n");
    expect(existsSync(join(repoRoot, "tracks/js/module-01/module/outside.js"))).toBe(false);
  });

  it("rejects a directory snapshot that targets the directory itself", () => {
    const repoRoot = createRepo({
      "tracks/js/module-01/module/src/index.js": "export const answer = 0;\n",
    });
    const starterPath = join(repoRoot, "tracks/js/module-01/module/src/index.js");

    expect(() => restoreStarterSnapshotInRepo(
      "js/module-01/module",
      {
        artifactName: "src",
        kind: "directory",
        files: [{
          path: ".",
          contentBase64: Buffer.from("invalid\n").toString("base64"),
        }],
      },
      repoRoot,
    )).toThrow("nieprawidłowy plik w kopii startera");

    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 0;\n");
  });
});
