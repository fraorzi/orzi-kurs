import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HOMEBREW_JAVA_HOME = "/opt/homebrew/opt/openjdk";
const TRACKS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../tracks");
const runSolutions = process.argv.includes("--run");
const verifyStarters = process.argv.includes("--starters");

function javaCommand(name: "java" | "javac"): string {
  if (process.env.ORZI_JAVA_HOME) {
    return join(process.env.ORZI_JAVA_HOME, "bin", name);
  }
  const homebrewCommand = join(HOMEBREW_JAVA_HOME, "bin", name);
  if (existsSync(homebrewCommand)) return homebrewCommand;
  if (process.env.JAVA_HOME) return join(process.env.JAVA_HOME, "bin", name);
  return name;
}

function taskDirs(path: string, output: string[] = []): string[] {
  if (existsSync(join(path, "_solution.java"))) output.push(path);
  for (const name of readdirSync(path)) {
    const child = join(path, name);
    if (statSync(child).isDirectory()) taskDirs(child, output);
  }
  return output;
}

let failures = 0;
const tasks = taskDirs(join(TRACKS_ROOT, "java")).sort();
for (const task of tasks) {
  const tmp = mkdtempSync(join(tmpdir(), "orzi-java-compile-"));
  let pipelinePassed = false;
  try {
    copyFileSync(
      join(task, verifyStarters ? "starter.java" : "_solution.java"),
      join(tmp, "Solution.java"),
    );
    const test = readFileSync(join(task, "run.test.ts"), "utf8");
    const encoded = /const TEST_MAIN\s*=\s*("(?:[^"\\]|\\.)*")/.exec(test)?.[1];
    if (!encoded) throw new Error("Nie znaleziono TEST_MAIN");
    writeFileSync(join(tmp, "TestMain.java"), JSON.parse(encoded), "utf8");
    execFileSync(javaCommand("javac"), [
      "--release", "24", "-encoding", "UTF-8", "-d", tmp,
      join(tmp, "Solution.java"), join(tmp, "TestMain.java"),
    ], { stdio: "pipe" });
    if (runSolutions || verifyStarters) {
      execFileSync(javaCommand("java"), [
        "-ea", "-Djava.awt.headless=true", "-cp", tmp, "TestMain",
      ], { stdio: "pipe" });
    }
    pipelinePassed = true;
    if (!verifyStarters) console.log(`✓ ${task.slice(TRACKS_ROOT.length + 1)}`);
  } catch (error) {
    if (verifyStarters) {
      console.log(`✓ ${task.slice(TRACKS_ROOT.length + 1)}`);
    } else {
      failures += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ ${task.slice(TRACKS_ROOT.length + 1)}\n  ${message}`);
      if (error && typeof error === "object" && "stderr" in error) {
        console.error(String((error as { stderr?: Buffer }).stderr ?? ""));
      }
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  if (verifyStarters && pipelinePassed) {
    failures += 1;
    console.error(`✗ ${task.slice(TRACKS_ROOT.length + 1)}\n  starter przechodzi cały pipeline`);
  }
}

const label = verifyStarters
  ? "starterów Java ma poprawną bramkę"
  : runSolutions
    ? "rozwiązań Java przechodzi runtime"
    : "rozwiązań Java kompiluje się z testem";
console.log(`${tasks.length - failures}/${tasks.length} ${label}`);
process.exitCode = failures === 0 ? 0 : 1;
