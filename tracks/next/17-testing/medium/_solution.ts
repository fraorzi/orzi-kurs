export interface RequestJsonOptions {
  readonly method: string;
  readonly url: string;
  readonly headers?: HeadersInit;
  readonly body?: unknown;
}

export interface HandlerResult {
  readonly status: number;
  readonly headers: Headers;
  readonly body: unknown;
}

export async function requestJson(
  handler: (request: Request) => Promise<Response>,
  options: RequestJsonOptions,
): Promise<HandlerResult> {
  const headers = new Headers(options.headers);
  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await handler(new Request(options.url, {
    method: options.method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  }));
  return {
    status: response.status,
    headers: new Headers(response.headers),
    body: response.status !== 204 &&
      response.headers.get("content-type")?.includes("application/json")
      ? await response.json()
      : null,
  };
}
