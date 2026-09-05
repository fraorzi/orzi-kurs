import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { readInitialArtifact, withInitialArtifact } from "./initial-artifact";

function git(repoRoot: string, ...args: string[]): void {
  const result = spawnSync("git", args, { cwd: repoRoot, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(result.stderr || `git ${args.join(" ")} nie powiódł się`);
  }
}

function createRepo(): string {
  const repoRoot = mkdtempSync(join(tmpdir(), "orzi-initial-artifact-"));
  git(repoRoot, "init");
  git(repoRoot, "config", "user.email", "test@example.com");
  git(repoRoot, "config", "user.name", "Harness Test");
  return repoRoot;
}

describe("initial artifact", () => {
  it("uses the revised curriculum template without changing the student's code", async () => {
    const repoRoot = createRepo();
    const starter = join(repoRoot, "tracks/react/topic/easy/starter.tsx");
    mkdirSync(join(repoRoot, "tracks/react/topic/easy"), { recursive: true });
    writeFileSync(starter, "student solution");
    writeFileSync(join(repoRoot, "tracks/react/topic/easy/_starter.tsx"), "revised template");
    expect(readInitialArtifact(starter, repoRoot)).toEqual({
      kind: "file",
      content: "revised template",
    });
    await withInitialArtifact(
      starter,
      async () => {
        expect(readFileSync(starter, "utf8")).toBe("revised template");
      },
      repoRoot,
    );
    expect(readFileSync(starter, "utf8")).toBe("student solution");
  });

  it("odczytuje pierwotną wersję pojedynczego startera z historii Git", () => {
    const repoRoot = createRepo();
    const starter = join(repoRoot, "tracks/js/topic/easy/starter.js");
    mkdirSync(join(repoRoot, "tracks/js/topic/easy"), { recursive: true });
    writeFileSync(starter, "export const value = 0;\n");
    git(repoRoot, "add", ".");
    git(repoRoot, "commit", "-m", "add task");
    writeFileSync(starter, "export const value = 42;\n");
    git(repoRoot, "add", ".");
    git(repoRoot, "commit", "-m", "solve task");

    expect(readInitialArtifact(starter, repoRoot)).toEqual({
      kind: "file",
      content: "export const value = 0;\n",
    });
  });

  it("na czas callbacku podmienia katalog src i zawsze przywraca bieżący kod", async () => {
    const repoRoot = createRepo();
    const src = join(repoRoot, "tracks/js/module/module/src");
    mkdirSync(src, { recursive: true });
    writeFileSync(join(src, "index.js"), "export const value = 0;\n");
    git(repoRoot, "add", ".");
    git(repoRoot, "commit", "-m", "add module");
    writeFileSync(join(src, "index.js"), "export const value = 42;\n");

    await expect(
      withInitialArtifact(
        src,
        async () => {
          expect(readFileSync(join(src, "index.js"), "utf8")).toBe("export const value = 0;\n");
          throw new Error("kontrolowany błąd");
        },
        repoRoot,
      ),
    ).rejects.toThrow("kontrolowany błąd");

    expect(existsSync(join(src, "index.js"))).toBe(true);
    expect(readFileSync(join(src, "index.js"), "utf8")).toBe("export const value = 42;\n");
  });
});
