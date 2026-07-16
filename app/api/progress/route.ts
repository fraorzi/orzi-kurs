import type { NextRequest } from "next/server";
import { resolveTaskDir } from "@/harness/paths";
import {
  ProgressConflictError,
  resetTaskProgress,
  restoreTaskProgress,
} from "@/harness/progress";
import { isTaskProgress } from "@/harness/progress-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  let body: { taskId?: string; progress?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "nieprawidłowy JSON w body", mutated: false },
      { status: 400 },
    );
  }

  if (
    !body.taskId ||
    typeof body.taskId !== "string" ||
    !isTaskProgress(body.progress)
  ) {
    return Response.json(
      { error: "wymagane pola taskId i prawidłowy progress", mutated: false },
      { status: 400 },
    );
  }
  try {
    resolveTaskDir(body.taskId);
    return Response.json(resetTaskProgress(body.taskId, body.progress));
  } catch (error) {
    if (error instanceof ProgressConflictError) {
      return Response.json(
        { error: error.message, mutated: false },
        { status: 409 },
      );
    }
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  let body: { taskId?: string; progress?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "nieprawidłowy JSON w body", mutated: false },
      { status: 400 },
    );
  }

  if (!body.taskId || typeof body.taskId !== "string" || !isTaskProgress(body.progress)) {
    return Response.json(
      { error: "wymagane pola taskId i prawidłowy progress", mutated: false },
      { status: 400 },
    );
  }
  try {
    resolveTaskDir(body.taskId);
    return Response.json({ progress: restoreTaskProgress(body.taskId, body.progress) });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
