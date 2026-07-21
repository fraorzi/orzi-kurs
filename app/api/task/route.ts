import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { NextRequest } from "next/server";
import {
  resolveTaskDir,
  findStarter,
  findSolution,
  readSolutionText,
} from "@/harness/paths";
import { parseHints } from "@/harness/hints";
import { readProgress } from "@/harness/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readIfExists(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "brak parametru id" }, { status: 400 });
  }

  let taskDir: string;
  try {
    taskDir = resolveTaskDir(id);
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 400 });
  }
  if (!existsSync(taskDir)) {
    return Response.json({ error: `zadanie nie istnieje: ${id}` }, { status: 404 });
  }

  const readme = readIfExists(join(taskDir, "..", "README.md"));
  const taskMd = readIfExists(join(taskDir, "task.md"));
  const hintsTotal = parseHints(join(taskDir, "hints.md")).length;
  const starterPath = findStarter(taskDir);

  const progress = readProgress()[id] ?? null;
  const status = progress?.status;
  const passed = status === "passed" || status === "passed-with-hint";
  const solutionPath = findSolution(taskDir);
  const solution = passed && solutionPath ? readSolutionText(solutionPath) : null;
  const starter = passed ? (progress?.verifiedStarter ?? null) : null;

  return Response.json({ readme, taskMd, hintsTotal, starterPath, starter, solution, progress });
}
