export type Fetcher = (input: string, init: RequestInit) => Promise<Response>;

function isInventory(value: unknown): value is { sku: string; available: number } {
  return typeof value === "object" && value !== null &&
    "sku" in value && typeof value.sku === "string" &&
    "available" in value && typeof value.available === "number" &&
    Number.isInteger(value.available) && value.available >= 0;
}

export function createInventoryGET(fetcher: Fetcher, timeoutMs = 1000) {
  return async function GET(request: Request): Promise<Response> {
    const sku = new URL(request.url).searchParams.get("sku")?.trim() ?? "";
    if (!sku) return Response.json({ error: "Missing sku" }, { status: 400 });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const upstream = await fetcher(
        `https://inventory.example/items/${encodeURIComponent(sku)}`,
        {
          headers: { Authorization: `Bearer ${process.env.INVENTORY_API_KEY}` },
          signal: controller.signal,
        },
      );
      if (upstream.status === 404) {
        return Response.json({ error: "Item not found" }, { status: 404 });
      }
      if (!upstream.ok) {
        return Response.json({ error: "Inventory unavailable" }, { status: 502 });
      }
      const payload: unknown = await upstream.json();
      if (!isInventory(payload)) {
        return Response.json({ error: "Invalid inventory response" }, { status: 502 });
      }
      return Response.json({ sku: payload.sku, available: payload.available });
    } catch (error) {
      return error instanceof DOMException && error.name === "AbortError"
        ? Response.json({ error: "Inventory timeout" }, { status: 504 })
        : Response.json({ error: "Inventory unavailable" }, { status: 502 });
    } finally {
      clearTimeout(timeout);
    }
  };
}

export const GET = createInventoryGET(fetch);
