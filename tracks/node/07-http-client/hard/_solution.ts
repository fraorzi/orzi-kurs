export async function solve(
  url: string,
  attempts: number,
  fetcher: typeof fetch,
  sleep: (ms: number) => Promise<void>,
): Promise<Response> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await fetcher(url);
    if (![429, 503].includes(response.status) || attempt === attempts)
      return response;
    const retryAfter = Number(response.headers.get("retry-after") ?? "0");
    await sleep(Number.isFinite(retryAfter) ? retryAfter * 1000 : 0);
  }
  throw new Error("Nieosiągalne");
}
