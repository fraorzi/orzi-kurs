import { execFile } from "node:child_process";
import { copyFileSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const HOMEBREW_JAVA_HOME = "/opt/homebrew/opt/openjdk";

function javaCommand(name: "java" | "javac"): string {
  if (process.env.ORZI_JAVA_HOME) {
    return join(process.env.ORZI_JAVA_HOME, "bin", name);
  }
  const homebrewCommand = join(HOMEBREW_JAVA_HOME, "bin", name);
  if (existsSync(homebrewCommand)) return homebrewCommand;
  if (process.env.JAVA_HOME) return join(process.env.JAVA_HOME, "bin", name);
  return name;
}

export async function runJavaTask(
  taskDir: string,
  testMainSource: string,
): Promise<string> {
  const tmp = mkdtempSync(join(tmpdir(), "orzi-java-"));
  try {
    copyFileSync(resolve(taskDir, "starter.java"), join(tmp, "Solution.java"));
    writeFileSync(join(tmp, "TestMain.java"), testMainSource, "utf8");
    await execFileAsync(javaCommand("javac"), [
      "--release", "24", "-encoding", "UTF-8", "-d", tmp,
      join(tmp, "Solution.java"), join(tmp, "TestMain.java"),
    ], { maxBuffer: 16 * 1024 * 1024 });
    const result = await execFileAsync(javaCommand("java"), [
      "-ea", "-Djava.awt.headless=true", "-cp", tmp, "TestMain",
    ], { maxBuffer: 16 * 1024 * 1024 });
    return result.stdout.trim();
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}
