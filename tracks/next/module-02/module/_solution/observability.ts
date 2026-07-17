export interface Span {
  setStatus(status: "ok" | "error"): void;
  recordException(error: unknown): void;
  end(): void;
}

export async function observeInventoryOperation<T>(input: {
  readonly name: string; readonly tenantId: string; readonly productId: string;
  readonly secret?: string; readonly startSpan: (name: string) => Span;
  readonly log: (entry: Record<string, unknown>) => void; readonly now: () => number;
  readonly operation: () => Promise<T>;
}): Promise<T> {
  const startedAt = input.now();
  const span = input.startSpan(input.name);
  try {
    const result = await input.operation();
    span.setStatus("ok");
    input.log({
      name: input.name, tenantId: input.tenantId, productId: input.productId,
      durationMs: Math.max(0, input.now() - startedAt), status: "ok",
    });
    return result;
  } catch (error) {
    span.recordException(error);
    span.setStatus("error");
    input.log({
      name: input.name, tenantId: input.tenantId, productId: input.productId,
      durationMs: Math.max(0, input.now() - startedAt), status: "error",
      errorCode: error instanceof Error && error.name ? error.name : "UNKNOWN",
    });
    throw error;
  } finally {
    span.end();
  }
}
