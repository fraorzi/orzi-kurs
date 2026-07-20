import type { NextRequest } from "next/server";
import { runTask } from "@/harness/runner";
import { readProgress } from "@/harness/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { taskId?: string; usedHint?: boolean };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  const taskId = body?.taskId;
  if (!taskId || typeof taskId !== "string") {
    return Response.json({ error: "wymagane pole taskId" }, { status: 400 });
  }

  const usedHint = body.usedHint === true || (readProgress()[taskId]?.revealedHints ?? 0) > 0;
  const result = await runTask(taskId, { usedHint });
  return Response.json({ ...result, usedHint });
}
