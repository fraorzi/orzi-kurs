export function solve(
  cleanups: readonly (() => Promise<void>)[],
): () => Promise<void> {
  let pending: Promise<void> | undefined;
  return () =>
    (pending ??= (async () => {
      const results = await Promise.allSettled(
        cleanups.map((cleanup) => cleanup()),
      );
      const failure = results.find(
        (result): result is PromiseRejectedResult =>
          result.status === "rejected",
      );
      if (failure) throw failure.reason;
    })());
}
