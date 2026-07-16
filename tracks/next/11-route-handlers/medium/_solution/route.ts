import { createItem } from "./item-store";

const ALLOWED_ORIGIN = "https://partner.example";

function corsHeaders(origin: string | null): HeadersInit {
  return origin === ALLOWED_ORIGIN
    ? {
        "Access-Control-Allow-Origin": origin,
        Vary: "Origin",
      }
    : {};
}

export async function OPTIONS(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin !== ALLOWED_ORIGIN) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders(origin),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, x-api-key",
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (origin !== ALLOWED_ORIGIN) {
    return Response.json({ error: "Forbidden origin" }, { status: 403 });
  }
  if (request.headers.get("x-api-key") !== process.env.PARTNER_API_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401, headers });
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(length) || length > 1024) {
    return Response.json({ error: "Payload too large" }, { status: 413, headers });
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return Response.json({ error: "Unsupported media type" }, { status: 415, headers });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400, headers });
  }
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("name" in payload) ||
    typeof payload.name !== "string" ||
    payload.name.trim().length === 0 ||
    payload.name.trim().length > 80
  ) {
    return Response.json({ error: "Invalid item" }, { status: 400, headers });
  }

  const item = await createItem(payload.name.trim());
  return Response.json(item, {
    status: 201,
    headers: { ...headers, Location: `/api/items/${item.id}` },
  });
}
