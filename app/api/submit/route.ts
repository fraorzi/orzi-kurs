import type { NextRequest } from "next/server";
import { runTask } from "@/harness/runner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { taskId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  const taskId = body?.taskId;
  if (!taskId || typeof taskId !== "string") {
    return Response.json({ error: "wymagane pole taskId" }, { status: 400 });
  }

  const result = await runTask(taskId);
  return Response.json(result);
}
