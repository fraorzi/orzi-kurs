export interface Span {
  setStatus(status: "ok" | "error"): void;
  recordException(error: unknown): void;
  end(): void;
}

export async function observeInventoryOperation<T>(input: {
  readonly name: string;
  readonly tenantId: string;
  readonly productId: string;
  readonly secret?: string;
  readonly startSpan: (name: string) => Span;
  readonly log: (entry: Record<string, unknown>) => void;
  readonly now: () => number;
  readonly operation: () => Promise<T>;
}): Promise<T> {
  const span = input.startSpan(input.name);
  const result = await input.operation();
  input.log({ ...input, result });
  span.end();
  return result;
}
