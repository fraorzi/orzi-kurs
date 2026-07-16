import type { NextRequest } from "next/server";
import {
  captureStarterSnapshot,
  restoreStarterCode,
  restoreStarterSnapshot,
} from "@/harness/starter-template";
import type { StarterSnapshot } from "@/shared/task-undo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("id");
  if (!taskId) {
    return Response.json({ error: "brak parametru id" }, { status: 400 });
  }
  try {
    return Response.json({ snapshot: captureStarterSnapshot(taskId) });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  let body: { taskId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "nieprawidłowy JSON w body", mutated: false },
      { status: 400 },
    );
  }

  if (!body.taskId || typeof body.taskId !== "string") {
    return Response.json(
      { error: "wymagane pole taskId", mutated: false },
      { status: 400 },
    );
  }

  try {
    return Response.json(restoreStarterCode(body.taskId));
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  let body: { taskId?: string; snapshot?: StarterSnapshot };
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "nieprawidłowy JSON w body", mutated: false },
      { status: 400 },
    );
  }

  if (!body.taskId || typeof body.taskId !== "string" || !body.snapshot) {
    return Response.json(
      { error: "wymagane pola taskId i snapshot", mutated: false },
      { status: 400 },
    );
  }

  try {
    return Response.json(restoreStarterSnapshot(body.taskId, body.snapshot));
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
