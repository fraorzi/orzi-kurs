export interface InstrumentationModule {
  register(): void | Promise<void>;
}

export async function registerRuntimeInstrumentation(
  runtime: string | undefined,
  loadNode: () => Promise<InstrumentationModule>,
  loadEdge: () => Promise<InstrumentationModule>,
): Promise<void> {
  if (runtime === "nodejs") {
    await (await loadNode()).register();
  } else if (runtime === "edge") {
    await (await loadEdge()).register();
  }
}

export interface RequestLogInput {
  readonly requestId: string;
  readonly method: string;
  readonly url: string;
  readonly status: number;
  readonly durationMs: number;
  readonly errorCode?: string;
  readonly headers?: Readonly<Record<string, string>>;
}

export function createRequestLog(input: RequestLogInput): Record<string, unknown> {
  return {
    requestId: input.requestId,
    method: input.method,
    pathname: new URL(input.url).pathname,
    status: input.status,
    durationMs: Math.max(0, Math.round(input.durationMs)),
    ...(input.errorCode ? { errorCode: input.errorCode } : {}),
  };
}
