import { createIdempotencyStore } from "./idempotency";
import { matchRoute } from "./router";
import type { AppOptions, HandlerResult, RouteMatch } from "./types";

type BodyOutcome =
  | { readonly ok: true; readonly body: unknown }
  | { readonly ok: false; readonly failure: HandlerResult };

async function readBody(
  request: Request,
  maxBodyBytes: number,
  requestId: string,
): Promise<BodyOutcome> {
  if (request.method !== "POST") return { ok: true, body: undefined };
  const raw = await request.text();
  if (Buffer.byteLength(raw) > maxBodyBytes) {
    return {
      ok: false,
      failure: { status: 413, body: { error: "Payload Too Large", requestId } },
    };
  }
  if (raw.length === 0) return { ok: true, body: undefined };
  try {
    return { ok: true, body: JSON.parse(raw) };
  } catch {
    return {
      ok: false,
      failure: { status: 400, body: { error: "Invalid JSON", requestId } },
    };
  }
}

function routeFailure(match: RouteMatch, requestId: string): HandlerResult | null {
  if (match.kind === "not-found") {
    return { status: 404, body: { error: "Not Found", requestId } };
  }
  if (match.kind === "method-mismatch") {
    return { status: 405, body: { error: "Method Not Allowed", requestId } };
  }
  return null;
}

function errorResult(error: unknown, requestId: string): HandlerResult {
  if (error instanceof Error && error.name === "ValidationError") {
    return { status: 400, body: { error: error.message, requestId } };
  }
  return { status: 500, body: { error: "Internal Server Error", requestId } };
}

export function createApp(
  options: AppOptions,
): (request: Request) => Promise<Response> {
  const store = createIdempotencyStore();

  const respond = (
    requestId: string,
    result: HandlerResult,
    extraHeaders: Record<string, string> = {},
  ): Response =>
    new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: {
        "content-type": "application/json",
        "x-request-id": requestId,
        ...extraHeaders,
      },
    });

  return async (request) => {
    const requestId =
      request.headers.get("x-request-id") ?? options.generateId();
    const match = matchRoute(
      options.routes,
      request.method,
      new URL(request.url).pathname,
    );

    const failure = routeFailure(match, requestId);
    if (failure) {
      const allow: Record<string, string> =
        match.kind === "method-mismatch"
          ? { allow: match.allow.join(", ") }
          : {};
      return respond(requestId, failure, allow);
    }

    const outcome = await readBody(request, options.maxBodyBytes, requestId);
    if (!outcome.ok) return respond(requestId, outcome.failure);

    const idempotencyKey =
      request.method === "POST" ? request.headers.get("idempotency-key") : null;
    const replay = idempotencyKey ? store.get(idempotencyKey) : undefined;
    if (replay) return respond(requestId, replay, { "idempotent-replay": "true" });

    try {
      const result = await (match as Extract<RouteMatch, { kind: "match" }>)
        .route.handler({ requestId, body: outcome.body });
      if (idempotencyKey) store.remember(idempotencyKey, result);
      return respond(requestId, result);
    } catch (error) {
      return respond(requestId, errorResult(error, requestId));
    }
  };
}
