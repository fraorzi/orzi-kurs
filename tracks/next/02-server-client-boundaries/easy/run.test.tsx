import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderWithUser, screen } from "@harness/next-test";
import { ProductCard } from "./src/ProductCard";

describe("ProductCard boundary", () => {
  it("hydratuje tylko interaktywny przycisk", async () => {
    const { user } = renderWithUser(
      <ProductCard name="Klawiatura" initialFavorite={false} />,
    );
    const button = screen.getByRole("button", {
      name: "Dodaj Klawiatura do ulubionych",
    });

    await user.click(button);

    expect(button).toHaveAccessibleName("Usuń Klawiatura z ulubionych");
  });

  it("utrzymuje dyrektywę na najwęższej granicy modułów", () => {
    const root = join(
      process.cwd(),
      "tracks/next/02-server-client-boundaries/easy/src",
    );
    const card = readFileSync(join(root, "ProductCard.tsx"), "utf8");
    const button = readFileSync(join(root, "FavoriteButton.tsx"), "utf8");

    expect(card).not.toContain("use client");
    expect(card).not.toContain("useState");
    expect(card).toContain("<FavoriteButton");
    expect(button.trimStart().startsWith('"use client"')).toBe(true);
  });
});
