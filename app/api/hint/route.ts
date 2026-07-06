import { join } from "node:path";
import { existsSync } from "node:fs";
import type { NextRequest } from "next/server";
import { resolveTaskDir } from "@/harness/paths";
import { getHint } from "@/harness/hints";

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
