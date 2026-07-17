import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderWithUser, screen, within } from "@harness/next-test";
import { ProductGrid } from "./src/ProductGrid";

describe("ProductGrid serialization boundary", () => {
  it("sortuje w kliencie na podstawie serializowalnych danych", async () => {
    const products = Object.freeze([
      Object.freeze({ id: "a", name: "Monitor", price: 100 }),
      Object.freeze({ id: "b", name: "Klawiatura", price: 300 }),
    ]);
    const { user } = renderWithUser(<ProductGrid products={products} />);
    const list = screen.getByRole("list", { name: "Produkty" });

    expect(within(list).getAllByRole("listitem").map((item) => item.textContent))
      .toEqual(["Klawiatura", "Monitor"]);
    await user.selectOptions(screen.getByRole("combobox", { name: "Sortowanie" }), "price");
    expect(within(list).getAllByRole("listitem").map((item) => item.textContent))
      .toEqual(["Monitor", "Klawiatura"]);
    expect(products[0].name).toBe("Monitor");
  });

  it("nie przekazuje funkcji przez granicę Server → Client", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/next/02-server-client-boundaries/medium/src/ProductGrid.tsx",
      ),
      "utf8",
    );

    expect(source).not.toContain("compareProducts");
    expect(source).not.toMatch(/compare\s*=/);
    expect(source).toContain("products={products}");
  });
});
