import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
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

  it("restores the original TODO starter even after a solved version was committed", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/hard/starter.js": "export function once(fn) {\n  // TODO\n}\n",
    });
    const starterPath = join(repoRoot, "tracks/js/01-functions/hard/starter.js");
    writeFileSync(starterPath, "export function once(fn) {\n  return fn;\n}\n", "utf8");
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
      "solve task",
    ]);

    restoreStarterCodeInRepo("js/01-functions/hard", repoRoot);

    expect(readFileSync(starterPath, "utf8"))
      .toBe("export function once(fn) {\n  // TODO\n}\n");
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

  it("recreates a deleted task directory for a tracked starter", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const taskDir = join(repoRoot, "tracks/js/01-functions/easy");
    rmSync(taskDir, { recursive: true });

    restoreStarterCodeInRepo("js/01-functions/easy", repoRoot);

    expect(readFileSync(join(taskDir, "starter.js"), "utf8"))
      .toBe("export const answer = 0;\n");
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

  it("replaces a symlinked file destination without writing through it", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const outsideRoot = mkdtempSync(join(tmpdir(), "orzi-starter-outside-"));
    temporaryRepos.push(outsideRoot);
    const outsidePath = join(outsideRoot, "starter.js");
    const starterPath = join(repoRoot, "tracks/js/01-functions/easy/starter.js");
    writeFileSync(outsidePath, "do not overwrite\n", "utf8");
    rmSync(starterPath);
    symlinkSync(outsidePath, starterPath);

    restoreStarterCodeInRepo("js/01-functions/easy", repoRoot);

    expect(lstatSync(starterPath).isSymbolicLink()).toBe(false);
    expect(readFileSync(starterPath, "utf8")).toBe("export const answer = 0;\n");
    expect(readFileSync(outsidePath, "utf8")).toBe("do not overwrite\n");
  });

  it("rejects task directories that resolve outside tracks", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
    });
    const outsideRoot = mkdtempSync(join(tmpdir(), "orzi-task-outside-"));
    temporaryRepos.push(outsideRoot);
    const taskDir = join(repoRoot, "tracks/js/01-functions/easy");
    writeFileSync(join(outsideRoot, "starter.js"), "outside\n", "utf8");
    rmSync(taskDir, { recursive: true });
    symlinkSync(outsideRoot, taskDir);

    expect(() => restoreStarterCodeInRepo("js/01-functions/easy", repoRoot))
      .toThrow("ścieżka poza dozwolonym katalogiem");
    expect(readFileSync(join(outsideRoot, "starter.js"), "utf8")).toBe("outside\n");
  });

  it("rejects a task directory symlinked to another task inside tracks", () => {
    const repoRoot = createRepo({
      "tracks/js/01-functions/easy/starter.js": "export const answer = 0;\n",
      "tracks/js/02-scope/easy/starter.js": "export const scope = true;\n",
    });
    const taskDir = join(repoRoot, "tracks/js/01-functions/easy");
    rmSync(taskDir, { recursive: true });
    symlinkSync(join(repoRoot, "tracks/js/02-scope/easy"), taskDir);

    expect(() => restoreStarterCodeInRepo("js/01-functions/easy", repoRoot))
      .toThrow("taskId prowadzi przez symlink");
    expect(readFileSync(
      join(repoRoot, "tracks/js/02-scope/easy/starter.js"),
      "utf8",
    )).toBe("export const scope = true;\n");
  });
});
