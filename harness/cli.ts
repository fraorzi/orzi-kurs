import {
  readdirSync,
  existsSync,
  copyFileSync,
  cpSync,
  rmSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { runTask } from "./runner";
import { resolveTaskDir, findStarter, findSolution, TRACKS_ROOT } from "./paths";
import type { SubmitResult } from "./types";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

function printResult(res: SubmitResult): void {
  const head = res.passed ? `${GREEN}PASS${RESET}` : `${RED}FAIL${RESET}`;
  console.log(`\n${head}  ${res.taskId}  ${DIM}(${res.durationMs}ms)${RESET}`);

  if (res.error) {
    console.log(`${RED}  błąd infrastruktury:${RESET} ${res.error}`);
  }

  for (const t of res.tests) {
    const mark = t.status === "pass" ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`;
    console.log(`  ${mark} ${t.name}`);
    if (t.status === "fail" && t.message) {
      console.log(`      ${DIM}${t.message}${RESET}`);
    }
  }

  for (const e of res.lint.errors) {
    console.log(`  ${RED}lint error${RESET} [${e.ruleId}] ln ${e.line}: ${e.message}`);
  }
  for (const w of res.lint.warnings) {
    console.log(`  ${YELLOW}lint warn${RESET} [${w.ruleId}] ln ${w.line}: ${w.message}`);
  }
}

async function cmdSubmit(taskId: string): Promise<number> {
  if (!taskId) {
    console.error("użycie: submit <taskId>");
    return 2;
  }
  const res = await runTask(taskId);
  printResult(res);
  return res.passed ? 0 : 1;
}

function dirsIn(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((n) => statSync(join(path, n)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function collectTaskDirs(root: string, acc: string[] = []): string[] {
  const hasStarter = findStarter(root);
  const hasSolution = findSolution(root);
  if (hasStarter && hasSolution) {
    acc.push(root);
  }
  for (const child of dirsIn(root)) {
    collectTaskDirs(join(root, child), acc);
  }
  return acc;
}

async function verifyOne(taskDir: string): Promise<boolean> {
  const starter = findStarter(taskDir)!;
  const solution = findSolution(taskDir)!;
  const isDir = statSync(starter).isDirectory();
  const backup = starter + ".verify-backup";
  const taskId = relative(TRACKS_ROOT, taskDir).split("\\").join("/");

  // Multi-file: backup the whole src/ dir, swap in _solution/ recursively
  // (dropping any files not present in the solution). Single-file: copy files.
  const swapIn = () => {
    if (isDir) {
      rmSync(starter, { recursive: true, force: true });
      cpSync(solution, starter, { recursive: true });
    } else {
      copyFileSync(solution, starter);
    }
  };
  const backupOriginal = () => {
    if (isDir) cpSync(starter, backup, { recursive: true });
    else copyFileSync(starter, backup);
  };
  const restoreOriginal = () => {
    if (isDir) {
      rmSync(starter, { recursive: true, force: true });
      cpSync(backup, starter, { recursive: true });
      rmSync(backup, { recursive: true, force: true });
    } else {
      copyFileSync(backup, starter);
      rmSync(backup, { force: true });
    }
  };

  backupOriginal();
  try {
    swapIn();
    const res = await runTask(taskId, { recordProgress: false, autoCommit: false });
    if (res.passed) {
      console.log(`  ${GREEN}✓${RESET} ${taskId} ${DIM}(${res.durationMs}ms)${RESET}`);
    } else {
      console.log(`  ${RED}✗${RESET} ${taskId}`);
      if (res.error) console.log(`      ${DIM}${res.error}${RESET}`);
      for (const t of res.tests.filter((t) => t.status === "fail")) {
        console.log(`      ${RED}✗${RESET} ${t.name}${t.message ? ` — ${t.message}` : ""}`);
      }
      for (const e of res.lint.errors) {
        console.log(`      ${RED}lint${RESET} [${e.ruleId}] ln ${e.line}: ${e.message}`);
      }
    }
    return res.passed;
  } finally {
    restoreOriginal();
  }
}

async function cmdVerify(trackId?: string): Promise<number> {
  const root = trackId ? resolveTaskDir(trackId) : TRACKS_ROOT;
  if (!existsSync(root)) {
    console.error(`nie znaleziono: ${trackId ?? "tracks/"}`);
    return 2;
  }
  const taskDirs = collectTaskDirs(root);
  if (taskDirs.length === 0) {
    console.log(`brak zadań z _solution.* w ${trackId ?? "tracks/"}`);
    return 0;
  }

  console.log(`verify: ${taskDirs.length} zadań w ${trackId ?? "tracks/"}\n`);
  let failures = 0;
  for (const dir of taskDirs) {
    const ok = await verifyOne(dir);
    if (!ok) failures++;
  }

  console.log(
    `\n${failures === 0 ? GREEN : RED}${taskDirs.length - failures}/${taskDirs.length} rozwiązań przechodzi${RESET}`,
  );
  return failures === 0 ? 0 : 1;
}

async function main(): Promise<void> {
  const [cmd, arg] = process.argv.slice(2);
  let code: number;
  if (cmd === "submit") {
    code = await cmdSubmit(arg);
  } else if (cmd === "verify") {
    code = await cmdVerify(arg);
  } else {
    console.error("użycie: tsx harness/cli.ts <submit|verify> [taskId|trackId]");
    code = 2;
  }
  process.exit(code);
}

void main();
