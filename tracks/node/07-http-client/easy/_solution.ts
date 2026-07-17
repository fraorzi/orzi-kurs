export async function solve<T>(url: string, fetcher: typeof fetch): Promise<T> {
  const response = await fetcher(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error("Oczekiwano JSON");
  return (await response.json()) as T;
}
