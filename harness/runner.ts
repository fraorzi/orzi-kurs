import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync, existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, relative, sep } from "node:path";
import { ESLint } from "eslint";
import type { SubmitResult, TestResult, LintIssue } from "./types";
import { REPO_ROOT } from "./progress";
import { resolveTaskDir, findStarter, readArtifactText, TRACKS_ROOT } from "./paths";
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
          `--environment=${vitestEnvironmentForTask(taskDir)}`,
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

export function vitestEnvironmentForTask(taskDir: string): "jsdom" | "node" {
  return ["react", "next"].includes(
    relative(TRACKS_ROOT, taskDir).split(sep)[0],
  )
    ? "jsdom"
    : "node";
}

async function runLint(
  taskDir: string,
): Promise<{ errors: LintIssue[]; warnings: LintIssue[] }> {
  const starter = findStarter(taskDir);
  const errors: LintIssue[] = [];
  const warnings: LintIssue[] = [];
  if (!starter) return { errors, warnings };
  if (!statSync(starter).isDirectory() && extname(starter) === ".sql") {
    return { errors, warnings };
  }

  // Multi-file tasks lint every source file under src/; single-file tasks
  // lint just starter.{js,jsx,ts,tsx}.
  const target = statSync(starter).isDirectory()
    ? join(starter, "**/*.{js,jsx,ts,tsx}")
    : starter;

  const eslint = new ESLint({ cwd: REPO_ROOT, errorOnUnmatchedPattern: false });
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

  let submittedStarter: string | undefined;
  try {
    const starter = findStarter(taskDir);
    submittedStarter = starter ? readArtifactText(starter) : undefined;
  } catch (error) {
    return {
      taskId,
      passed: false,
      tests: [],
      lint: { errors: [], warnings: [] },
      typecheck: { errors: [] },
      durationMs: Math.round(performance.now() - started),
      error: `nie udało się odczytać zgłaszanego rozwiązania: ${(error as Error).message}`,
    };
  }

  const [{ tests, error }, lint, typeErrors] = await Promise.all([
    runVitest(taskDir),
    runLint(taskDir),
    runTypecheck(taskDir),
  ]);

  const testsGreen =
    !error && tests.length > 0 && tests.every((t) => t.status === "pass");
  let submissionError = error;
  const checksPassed =
    testsGreen && lint.errors.length === 0 && typeErrors.length === 0;
  if (checksPassed) {
    try {
      const currentStarter = findStarter(taskDir);
      const currentSource = currentStarter ? readArtifactText(currentStarter) : undefined;
      if (currentSource !== submittedStarter) {
        submissionError =
          "kod zmienił się podczas sprawdzania — uruchom sprawdzenie ponownie";
      }
    } catch (currentSourceError) {
      submissionError =
        `nie udało się potwierdzić sprawdzonego rozwiązania: ${(currentSourceError as Error).message}`;
    }
  }
  const passed = checksPassed && !submissionError;

  const result: SubmitResult = {
    taskId,
    passed,
    tests,
    lint,
    typecheck: { errors: typeErrors },
    durationMs: Math.round(performance.now() - started),
    error: submissionError,
  };

  if (recordProgress) {
    result.progress = recordRun(taskId, {
      passed,
      usedHint,
      verifiedStarter: passed ? submittedStarter : undefined,
    }).taskProgress;
  }

  return result;
}
