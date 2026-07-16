export type AsyncError = {
  kind: "aborted" | "failed";
  message: string;
};

export type AsyncResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: AsyncError };

export async function captureAsync<T>(
  operation: () => Promise<T>,
): Promise<AsyncResult<T>> {
  // TODO: normalizuj unknown z catch
  return { ok: false, error: { kind: "failed", message: "TODO" } };
}
