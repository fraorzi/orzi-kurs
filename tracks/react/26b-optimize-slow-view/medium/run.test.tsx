import { describe, expect, it } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ProductGrid } from "./starter";

const products = [
  { id: "p1", name: "Laptop" },
  { id: "p2", name: "Monitor" },
  { id: "p3", name: "Klawiatura" },
] as const;

describe("ProductGrid", () => {
  it("zaznacza właściwy produkt", async () => {
    const { user } = renderWithUser(<ProductGrid products={products} />);

    await user.click(screen.getByRole("button", { name: "Laptop" }));

    expect(screen.getByRole("status")).toHaveTextContent("Wybrano: p1");
    expect(screen.getByRole("button", { name: "Laptop" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("[quality] commituję tylko wiersz ze zmienionym prope'em", async () => {
    const counters = {
      p1: createRenderCounter(),
      p2: createRenderCounter(),
      p3: createRenderCounter(),
    };
    const { user } = renderWithUser(
      <ProductGrid
        products={products}
        onRowRender={(id) => counters[id as keyof typeof counters].onRender}
      />,
    );
    Object.values(counters).forEach((counter) => counter.reset());

    await user.click(screen.getByRole("button", { name: "Laptop" }));

    expect(counters.p1.commits).toBe(1);
    expect(counters.p2.commits).toBe(0);
    expect(counters.p3.commits).toBe(0);
  });
});

