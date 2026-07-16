import { describe, expect, it, vi } from "vitest";
import { buildProductMetadata } from "./starter";

describe("buildProductMetadata", () => {
  it("buduje canonical i kartę społecznościową", async () => {
    const readProduct = vi.fn(async () => ({
      title: "Monitor 4K",
      description: "Monitor do pracy",
      imageUrl: "https://cdn.example/products/monitor.jpg",
    }));
    await expect(buildProductMetadata(
      Promise.resolve({ slug: "monitor 4k" }),
      readProduct,
    )).resolves.toMatchObject({
      title: "Monitor 4K",
      description: "Monitor do pracy",
      alternates: { canonical: "/products/monitor%204k" },
      openGraph: {
        title: "Monitor 4K",
        description: "Monitor do pracy",
        images: ["https://cdn.example/products/monitor.jpg"],
      },
    });
    expect(readProduct).toHaveBeenCalledOnce();
  });

  it("ustawia noindex dla brakującej encji", async () => {
    await expect(buildProductMetadata(
      Promise.resolve({ slug: "missing" }),
      async () => null,
    )).resolves.toEqual({
      title: "Produkt niedostępny",
      robots: { index: false, follow: false },
    });
  });
});
