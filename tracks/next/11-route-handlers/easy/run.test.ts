import { describe, expect, it } from "vitest";
import { GET } from "./starter";

describe("GET /api/products", () => {
  it("zwraca domyślną stronę i prywatny cache policy", async () => {
    const response = await GET(new Request("https://example.com/api/products"));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    await expect(response.json()).resolves.toMatchObject({ page: 1, limit: 20 });
  });

  it("stronicuje poprawny request", async () => {
    const response = await GET(
      new Request("https://example.com/api/products?page=2&limit=3"),
    );
    await expect(response.json()).resolves.toEqual({
      data: [
        { id: "p-4", name: "Produkt 4" },
        { id: "p-5", name: "Produkt 5" },
        { id: "p-6", name: "Produkt 6" },
      ],
      page: 2,
      limit: 3,
    });
  });

  it.each(["page=0", "page=1.5", "limit=101", "limit=abc"])(
    "odrzuca %s",
    async (query) => {
      const response = await GET(new Request(`https://example.com/api/products?${query}`));
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({ error: "Invalid pagination" });
    },
  );
});
