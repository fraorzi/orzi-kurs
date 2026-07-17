export function solve(
  repo: {
    create(
      input: { title: string },
      requestId: string,
    ): Promise<{ id: string; title: string }>;
  },
  log: (entry: { requestId: string; status: number }) => void,
): (request: Request) => Promise<Response> {
  const completed = new Map<string, Response>();
  return async (request) => {
    const requestId =
      request.headers.get("x-request-id") ?? crypto.randomUUID();
    const respond = (status: number, body: unknown) => {
      log({ requestId, status });
      return Response.json(body, {
        status,
        headers: { "x-request-id": requestId },
      });
    };
    try {
      const url = new URL(request.url);
      if (request.method !== "POST" || url.pathname !== "/tasks")
        return respond(404, { error: "Not Found", requestId });
      const key = request.headers.get("idempotency-key");
      if (!key)
        return respond(400, { error: "Missing idempotency key", requestId });
      const cached = completed.get(key);
      if (cached) return cached.clone();
      if (!request.headers.get("content-type")?.includes("application/json"))
        return respond(415, { error: "Expected JSON", requestId });
      const length = Number(request.headers.get("content-length") ?? "0");
      if (length > 1024)
        return respond(413, { error: "Payload Too Large", requestId });
      const value = (await request.json()) as { title?: unknown };
      if (
        typeof value.title !== "string" ||
        !value.title.trim() ||
        value.title.length > 120
      )
        return respond(422, { error: "Invalid title", requestId });
      const created = await repo.create(
        { title: value.title.trim() },
        requestId,
      );
      const response = respond(201, created);
      completed.set(key, response.clone());
      return response;
    } catch {
      return respond(500, { error: "Internal Server Error", requestId });
    }
  };
}
