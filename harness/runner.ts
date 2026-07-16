import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ESLint } from "eslint";
import type { SubmitResult, TestResult, LintIssue } from "./types";
import { REPO_ROOT } from "./progress";
import { resolveTaskDir, findStarter, TRACKS_ROOT } from "./paths";
import { recordRun } from "./progress";
import { runTypecheck } from "./typecheck";

const execFileAsync = promisify(execFile);

interface VitestAssertion {
  ancestorTitles: string[];
  title: string;
  status: string;
  failureMessages: string[];
}

interface VitestFileResult {
  assertionResults: VitestAssertion[];
  status: string;
  message: string;
  name: string;
}

interface VitestJson {
  testResults: VitestFileResult[];
}

function firstAssertionMessage(messages: string[]): string | undefined {
  if (!messages.length) return undefined;
  const clean = messages[0]
    .replace(/\u001b\[[0-9;]*m/g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => !/^\s*at\s/.test(line) && !line.includes("node_modules/"))
    .slice(0, 6)
    .join("\n")
    .trim();
  return clean ? clean.slice(0, 1200) : undefined;
}

async function runVitest(
  taskDir: string,
): Promise<{ tests: TestResult[]; error?: string }> {
  const tmp = mkdtempSync(join(tmpdir(), "orzi-vitest-"));
  const outFile = join(tmp, "result.json");
  try {
    try {
      await execFileAsync(
        "pnpm",
        [
          "exec",
          "vitest",
          "run",
          taskDir,
          "--reporter=json",
          `--outputFile=${outFile}`,
        ],
        { cwd: REPO_ROOT, maxBuffer: 32 * 1024 * 1024 },
      );
    } catch {
      // vitest exits non-zero on test failure; JSON file still written.
    }

    if (!existsSync(outFile)) {
      return {
        tests: [],
        error: "vitest nie wygenerował raportu JSON (możliwy błąd konfiguracji)",
      };
    }

    const json = JSON.parse(readFileSync(outFile, "utf8")) as VitestJson;
    const tests: TestResult[] = [];
    let infraError: string | undefined;

    for (const file of json.testResults ?? []) {
      if (
        (!file.assertionResults || file.assertionResults.length === 0) &&
        file.status === "failed" &&
        file.message
      ) {
        infraError = file.message.split("\n").slice(0, 3).join("\n").trim();
      }
      for (const a of file.assertionResults ?? []) {
        const name = [...a.ancestorTitles, a.title].filter(Boolean).join(" > ");
        tests.push({
          name,
          status: a.status === "passed" ? "pass" : "fail",
          message:
            a.status === "passed"
              ? undefined
              : firstAssertionMessage(a.failureMessages),
        });
      }
    }

    if (tests.length === 0 && !infraError) {
      infraError = "brak testów w run.test — sprawdź plik testowy zadania";
    }

    return { tests, error: infraError };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function runLint(
  taskDir: string,
): Promise<{ errors: LintIssue[]; warnings: LintIssue[] }> {
  const starter = findStarter(taskDir);
  const errors: LintIssue[] = [];
  const warnings: LintIssue[] = [];
  if (!starter) return { errors, warnings };

  // Multi-file tasks lint every source file under src/; single-file tasks
  // lint just starter.{js,ts}.
  const target = statSync(starter).isDirectory()
    ? join(starter, "**/*.{js,ts}")
    : starter;

  const eslint = new ESLint({ cwd: REPO_ROOT });
  const results = await eslint.lintFiles([target]);
  for (const res of results) {
    for (const m of res.messages) {
      const issue: LintIssue = {
        ruleId: m.ruleId ?? "syntax",
        message: m.message,
        line: m.line,
      };
      if (m.severity === 2) errors.push(issue);
      else warnings.push(issue);
    }
  }
  return { errors, warnings };
}

export interface RunOptions {
  recordProgress?: boolean;
  usedHint?: boolean;
}

export async function runTask(
  taskId: string,
  opts: RunOptions = {},
): Promise<SubmitResult> {
  const { recordProgress = true, usedHint = false } = opts;
  const started = performance.now();
  let taskDir: string;
  try {
    taskDir = resolveTaskDir(taskId);
  } catch (e) {
    return {
      taskId,
      passed: false,
      tests: [],
      lint: { errors: [], warnings: [] },
      typecheck: { errors: [] },
      durationMs: Math.round(performance.now() - started),
      error: (e as Error).message,
    };
  }

  if (!existsSync(taskDir) || !taskDir.startsWith(TRACKS_ROOT)) {
    return {
      taskId,
      passed: false,
      tests: [],
      lint: { errors: [], warnings: [] },
      typecheck: { errors: [] },
      durationMs: Math.round(performance.now() - started),
      error: `zadanie nie istnieje: ${taskId}`,
    };
  }

  const [{ tests, error }, lint, typeErrors] = await Promise.all([
    runVitest(taskDir),
    runLint(taskDir),
    runTypecheck(taskDir),
  ]);

  const testsGreen =
    !error && tests.length > 0 && tests.every((t) => t.status === "pass");
  const passed =
    testsGreen && lint.errors.length === 0 && typeErrors.length === 0;

  const result: SubmitResult = {
    taskId,
    passed,
    tests,
    lint,
    typecheck: { errors: typeErrors },
    durationMs: Math.round(performance.now() - started),
    error,
  };

  if (recordProgress) {
    result.progress = recordRun(taskId, {
      passed,
      usedHint,
    }).taskProgress;
  }

  return result;
}
