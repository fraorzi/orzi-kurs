const products = Array.from({ length: 150 }, (_, index) => ({
  id: `p-${index + 1}`,
  name: `Produkt ${index + 1}`,
}));

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const limit = Number(url.searchParams.get("limit") ?? 20);
  if (
    !Number.isInteger(page) ||
    page <= 0 ||
    !Number.isInteger(limit) ||
    limit <= 0 ||
    limit > 100
  ) {
    return Response.json({ error: "Invalid pagination" }, { status: 400 });
  }

  const start = (page - 1) * limit;
  return Response.json(
    { data: products.slice(start, start + limit), page, limit },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
