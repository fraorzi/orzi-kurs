export interface InstrumentationModule {
  register(): void | Promise<void>;
}

export async function registerRuntimeInstrumentation(
  _runtime: string | undefined,
  loadNode: () => Promise<InstrumentationModule>,
  loadEdge: () => Promise<InstrumentationModule>,
): Promise<void> {
  (await loadNode()).register();
  (await loadEdge()).register();
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
  return { ...input };
}
