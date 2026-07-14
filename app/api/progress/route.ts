import type { NextRequest } from "next/server";
import { resolveTaskDir } from "@/harness/paths";
import { resetTaskProgress } from "@/harness/progress";

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
