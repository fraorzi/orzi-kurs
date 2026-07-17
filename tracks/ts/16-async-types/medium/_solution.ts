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
  try {
    return { ok: true, value: await operation() };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        ok: false,
        error: { kind: "aborted", message: error.message },
      };
    }
    return {
      ok: false,
      error: {
        kind: "failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
