export async function solve(
  url: string,
  timeoutMs: number,
  fetcher: typeof fetch,
  parent?: AbortSignal,
): Promise<Response> {
  const timeout = AbortSignal.timeout(timeoutMs);
  const signal = parent ? AbortSignal.any([parent, timeout]) : timeout;
  return await fetcher(url, { signal });
}
