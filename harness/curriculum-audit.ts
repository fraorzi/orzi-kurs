import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
// @ts-expect-error Native Node strip-types requires the explicit TypeScript extension.
import { TOPIC_ORDER } from "../curriculum/order.ts";

const TRACKS_ROOT = resolve("tracks");
const STARTERS = ["starter.ts", "starter.tsx", "starter.js", "starter.sql", "starter.java", "src"];
const SOLUTIONS = ["_solution.ts", "_solution.tsx", "_solution.js", "_solution.sql", "_solution.java", "_solution"];
const TESTS = ["run.test.ts", "run.test.tsx", "run.test.js"];
const errors: string[] = [];

function directories(path: string): string[] {
  return readdirSync(path)
    .filter((name) => statSync(join(path, name)).isDirectory())
    .sort((left, right) => left.localeCompare(right));
}

function taskFiles(path: string, output: string[] = []): string[] {
  for (const name of readdirSync(path)) {
    const child = join(path, name);
    if (statSync(child).isDirectory()) taskFiles(child, output);
    else if (name === "task.md") output.push(child);
  }
  return output;
}

function hasAny(path: string, candidates: string[]): boolean {
  return candidates.some((candidate) => existsSync(join(path, candidate)));
}

const publicTracks = directories(TRACKS_ROOT).filter((track) => !track.startsWith("_"));
const orderedTracks = Object.keys(TOPIC_ORDER).sort((left, right) => left.localeCompare(right));
for (const track of publicTracks.filter((name) => !orderedTracks.includes(name))) {
  errors.push(`${track}: track nie istnieje w TOPIC_ORDER`);
}
for (const track of orderedTracks.filter((name) => !publicTracks.includes(name))) {
  errors.push(`${track}: TOPIC_ORDER wskazuje brakujący track`);
}

let totalTopics = 0;
let totalTasks = 0;
for (const track of orderedTracks) {
  const trackRoot = join(TRACKS_ROOT, track);
  if (!existsSync(trackRoot)) continue;
  const topics = directories(trackRoot);
  const order = [...TOPIC_ORDER[track]];
  const duplicates = order.filter((slug, index) => order.indexOf(slug) !== index);
  const missingFromOrder = topics.filter((slug) => !order.includes(slug));
  const staleInOrder = order.filter((slug) => !topics.includes(slug));
  for (const slug of new Set(duplicates)) errors.push(`${track}/${slug}: duplikat w TOPIC_ORDER`);
  for (const slug of missingFromOrder) errors.push(`${track}/${slug}: brak w TOPIC_ORDER`);
  for (const slug of staleInOrder) errors.push(`${track}/${slug}: brak katalogu wskazanego przez TOPIC_ORDER`);

  const tasks = taskFiles(trackRoot).sort((left, right) => left.localeCompare(right));
  for (const task of tasks) {
    const taskDir = dirname(task);
    const taskId = taskDir.slice(TRACKS_ROOT.length + 1);
    if (!hasAny(taskDir, STARTERS)) errors.push(`${taskId}: brak startera`);
    if (!hasAny(taskDir, SOLUTIONS)) errors.push(`${taskId}: brak rozwiązania`);
    if (!hasAny(taskDir, TESTS)) errors.push(`${taskId}: brak testu`);
    if (!existsSync(join(taskDir, "hints.md"))) errors.push(`${taskId}: brak hintów`);
  }

  if (["react", "next"].includes(track)) {
    const forbidden = taskFiles(trackRoot)
      .flatMap((task) => readdirSync(dirname(task)).map((name) => join(dirname(task), name)))
      .filter((path) => /(?:starter|_solution)\.jsx?$/.test(path));
    for (const path of forbidden) errors.push(`${path}: React i Next muszą używać TypeScript/TSX`);
  }

  totalTopics += topics.length;
  totalTasks += tasks.length;
  console.log(`${track.padEnd(8)} ${String(topics.length).padStart(3)} tematów  ${String(tasks.length).padStart(3)} zadań`);
}

console.log(`Razem    ${totalTopics} tematów  ${totalTasks} zadań publicznych`);
if (errors.length > 0) {
  for (const error of errors) console.error(`✗ ${error}`);
  process.exitCode = 1;
} else {
  console.log("✓ kolejność i komplet artefaktów są spójne");
}
