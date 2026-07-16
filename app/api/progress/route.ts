import type { NextRequest } from "next/server";
import { resolveTaskDir } from "@/harness/paths";
import { resetTaskProgress, restoreTaskProgress } from "@/harness/progress";
import type { TaskProgress } from "@/harness/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  let body: { taskId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  if (!body.taskId || typeof body.taskId !== "string") {
    return Response.json({ error: "wymagane pole taskId" }, { status: 400 });
  }
  try {
    resolveTaskDir(body.taskId);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }

  return Response.json({ progress: resetTaskProgress(body.taskId) });
}

function isTaskProgress(value: unknown): value is TaskProgress {
  if (!value || typeof value !== "object") return false;
  const progress = value as Partial<TaskProgress>;
  return (
    ["passed", "passed-with-hint", "failed", "not-started"].includes(progress.status ?? "") &&
    typeof progress.attempts === "number" &&
    typeof progress.lastRunAt === "string"
  );
}

export async function PATCH(req: NextRequest) {
  let body: { taskId?: string; progress?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  if (!body.taskId || typeof body.taskId !== "string" || !isTaskProgress(body.progress)) {
    return Response.json({ error: "wymagane pola taskId i prawidłowy progress" }, { status: 400 });
  }
  try {
    resolveTaskDir(body.taskId);
    return Response.json({ progress: restoreTaskProgress(body.taskId, body.progress) });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
