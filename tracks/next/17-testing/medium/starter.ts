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
  const response = await handler(new Request(options.url));
  return {
    status: response.status,
    headers: response.headers,
    body: await response.text(),
  };
}
