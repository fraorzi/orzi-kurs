export type Fetcher = (input: string, init: RequestInit) => Promise<Response>;

export function createInventoryGET(fetcher: Fetcher, timeoutMs = 1000) {
  return async function GET(request: Request): Promise<Response> {
    const sku = new URL(request.url).searchParams.get("sku") ?? "";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetcher(`https://inventory.example/items/${sku}`, {
        headers: { Authorization: `Bearer ${process.env.INVENTORY_API_KEY}` },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
  };
}

export const GET = createInventoryGET(fetch);
