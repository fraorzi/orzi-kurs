import { join } from "node:path";
import { existsSync } from "node:fs";
import type { NextRequest } from "next/server";
import { resolveTaskDir } from "@/harness/paths";
import { getHint } from "@/harness/hints";
import { clearTaskHints, revealTaskHint } from "@/harness/progress";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const n = Number(req.nextUrl.searchParams.get("n"));
  if (!id || !Number.isInteger(n)) {
    return Response.json({ error: "wymagane: id oraz n (liczba)" }, { status: 400 });
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

  const hint = getHint(join(taskDir, "hints.md"), n);
  if (hint === null) {
    return Response.json({ error: `brak hinta nr ${n}` }, { status: 404 });
  }
  return Response.json({ hint });
}

export async function PATCH(req: NextRequest) {
  let body: { taskId?: string; n?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "nieprawidłowy JSON w body" }, { status: 400 });
  }

  if (
    !body.taskId ||
    typeof body.taskId !== "string" ||
    typeof body.n !== "number" ||
    !Number.isInteger(body.n) ||
    body.n < 1
  ) {
    return Response.json({ error: "wymagane: taskId oraz dodatnie całkowite n" }, { status: 400 });
  }

  let taskDir: string;
  try {
    taskDir = resolveTaskDir(body.taskId);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
  if (!existsSync(taskDir)) {
    return Response.json({ error: `zadanie nie istnieje: ${body.taskId}` }, { status: 404 });
  }

  const hint = getHint(join(taskDir, "hints.md"), body.n);
  if (hint === null) {
    return Response.json({ error: `brak hinta nr ${body.n}` }, { status: 404 });
  }

  return Response.json({
    hint,
    progress: revealTaskHint(body.taskId, body.n),
  });
}

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
    const taskDir = resolveTaskDir(body.taskId);
    if (!existsSync(taskDir)) {
      return Response.json({ error: `zadanie nie istnieje: ${body.taskId}` }, { status: 404 });
    }
    return Response.json({ progress: clearTaskHints(body.taskId) });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
