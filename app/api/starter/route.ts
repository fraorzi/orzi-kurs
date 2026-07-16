import type { NextRequest } from "next/server";
import { restoreStarterCode } from "@/harness/starter-template";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
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
    return Response.json(restoreStarterCode(body.taskId));
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
