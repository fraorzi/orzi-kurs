import type { NextRequest } from "next/server";
import { experimentForTask, runExperiment } from "@/harness/experiments/run";
import { isRecord } from "@/shared/experiments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  try {
    return Response.json(experimentForTask(request.nextUrl.searchParams.get("id") ?? ""), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Nie można odczytać eksperymentu." }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") && request.headers.get("origin") !== request.nextUrl.origin) return Response.json({ error: "Niedozwolone źródło żądania." }, { status: 403 });
  try {
    const text = await request.text();
    if (text.length > 64000) return Response.json({ error: "Dane przekraczają limit 64 KB." }, { status: 413 });
    const body: unknown = JSON.parse(text);
    if (!isRecord(body) || typeof body.taskId !== "string") throw new Error("Wymagane pole taskId.");
    return Response.json(await runExperiment(body.taskId, body.input, request.signal));
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Nie udało się uruchomić przykładu." }, { status: 400 });
  }
}
