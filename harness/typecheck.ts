import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, relative, sep } from "node:path";
import type { TypeIssue } from "./types";
import { REPO_ROOT } from "./progress";
import { findStarter } from "./paths";

const execFileAsync = promisify(execFile);
const TASK_TSCONFIG = "tsconfig.task.json";
const ALLOWED_TASK_COMPILER_OPTIONS = new Set([
  "exactOptionalPropertyTypes",
  "noPropertyAccessFromIndexSignature",
  "noUncheckedIndexedAccess",
  "useUnknownInCatchVariables",
  "verbatimModuleSyntax",
]);

const TSC_BIN = resolve(
  REPO_ROOT,
  "node_modules",
  process.env.ORZI_TSC_PACKAGE ?? "typescript",
  "bin/tsc",
);

/**
 * Never typechecked: the reference solution (`_solution*`) and the backup copies
 * `verify:solutions` parks next to the starter while the solution is swapped in.
 */
function isExcluded(path: string): boolean {
  return path
    .split(sep)
    .some((seg) => seg.startsWith("_solution") || seg.endsWith(".verify-backup"));
}

function walkTsFiles(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir).sort((a, b) => a.localeCompare(b))) {
    const full = join(dir, name);
    if (isExcluded(full)) continue;
    if (statSync(full).isDirectory()) walkTsFiles(full, acc);
    else if (full.endsWith(".ts") && !full.endsWith(".d.ts")) acc.push(full);
  }
  return acc;
}

/**
 * Files the tsc gate covers: every `.ts` file of the task (starter.ts or the
 * whole src/ tree, run.test.ts, any local helper), minus `_solution*`.
 * Empty list ⇒ plain-JS task ⇒ no tsc run at all (keeps the js track fast).
 */
export function collectTypecheckFiles(taskDir: string): string[] {
  const starter = findStarter(taskDir);
  if (!starter) return [];

  const starterIsTs = !statSync(starter).isDirectory() && starter.endsWith(".ts");
  const srcHasTs =
    statSync(starter).isDirectory() && walkTsFiles(starter).length > 0;
  if (!starterIsTs && !srcHasTs) return [];

  return walkTsFiles(taskDir);
}

export function isTypeScriptTask(taskDir: string): boolean {
  return collectTypecheckFiles(taskDir).length > 0;
}

/**
 * `<abs file>(12,3): error TS2322: Type 'null' is not assignable to …`
 * Continuation lines (indented) belong to the previous diagnostic.
 */
const DIAG_RE = /^(.+?)\((\d+),\d+\): error (TS\d+): (.*)$/;

function parseTscOutput(stdout: string, taskDir: string): TypeIssue[] {
  const issues: TypeIssue[] = [];
  for (const raw of stdout.split("\n")) {
    const line = raw.replace(/\r$/, "");
    if (!line.trim()) continue;

    const m = DIAG_RE.exec(line);
    if (!m) {
      // Indented continuation of the previous multi-line diagnostic.
      if (/^\s/.test(line) && issues.length > 0) {
        issues[issues.length - 1].message += ` ${line.trim()}`;
      }
      continue;
    }

    const [, abs, lineNo, code, message] = m;
    if (isExcluded(abs)) continue;
    issues.push({
      file: relative(taskDir, abs).split(sep).join("/"),
      line: Number(lineNo),
      code,
      message: message.trim(),
    });
  }
  return issues;
}

export function taskCompilerOptions(
  taskDir: string,
): Record<string, boolean> {
  const configPath = join(taskDir, TASK_TSCONFIG);
  if (!existsSync(configPath)) return {};

  const parsed = JSON.parse(readFileSync(configPath, "utf8")) as {
    compilerOptions?: unknown;
  };
  if (
    parsed.compilerOptions === undefined ||
    typeof parsed.compilerOptions !== "object" ||
    parsed.compilerOptions === null ||
    Array.isArray(parsed.compilerOptions)
  ) {
    throw new Error(`${TASK_TSCONFIG} wymaga obiektu compilerOptions`);
  }

  const options: Record<string, boolean> = {};
  for (const [name, value] of Object.entries(parsed.compilerOptions)) {
    if (!ALLOWED_TASK_COMPILER_OPTIONS.has(name)) {
      throw new Error(`${TASK_TSCONFIG}: niedozwolona opcja ${name}`);
    }
    if (typeof value !== "boolean") {
      throw new Error(`${TASK_TSCONFIG}: ${name} musi być boolean`);
    }
    options[name] = value;
  }
  return options;
}

function tsconfigFor(files: string[], taskDir: string): string {
  return JSON.stringify(
    {
      compilerOptions: {
        strict: true,
        noEmit: true,
        target: "ES2022",
        lib: ["ES2023", "DOM"],
        module: "ESNext",
        moduleResolution: "Bundler",
        skipLibCheck: true,
        types: ["node"],
        typeRoots: [resolve(REPO_ROOT, "node_modules/@types")],
        paths: { "@harness/*": [resolve(REPO_ROOT, "harness/*")] },
        ...taskCompilerOptions(taskDir),
      },
      include: files,
    },
    null,
    2,
  );
}

/**
 * Runs `tsc --noEmit` over the task's own TypeScript files with a standalone,
 * generated tsconfig (strict, bundler resolution, `@harness/*` mapped).
 * Returns [] for plain-JS tasks without spawning tsc.
 */
export async function runTypecheck(taskDir: string): Promise<TypeIssue[]> {
  const files = collectTypecheckFiles(taskDir);
  if (files.length === 0) return [];

  const tmp = mkdtempSync(join(tmpdir(), "orzi-tsc-"));
  const configPath = join(tmp, "tsconfig.json");
  try {
    writeFileSync(configPath, tsconfigFor(files, taskDir), "utf8");

    let stdout = "";
    try {
      const res = await execFileAsync(
        process.execPath,
        [TSC_BIN, "-p", configPath, "--pretty", "false"],
        { cwd: REPO_ROOT, maxBuffer: 32 * 1024 * 1024 },
      );
      stdout = res.stdout;
    } catch (e) {
      // tsc exits 2 when it reports diagnostics; the report is on stdout.
      const err = e as { stdout?: string; stderr?: string; message?: string };
      stdout = err.stdout ?? "";
      if (!stdout.trim()) {
        return [
          {
            file: ".",
            line: 0,
            code: "TS0000",
            message: `tsc nie uruchomił się: ${err.stderr?.trim() || err.message || "nieznany błąd"}`,
          },
        ];
      }
    }

    return parseTscOutput(stdout, taskDir);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}
