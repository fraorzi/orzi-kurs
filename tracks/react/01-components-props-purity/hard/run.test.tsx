import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { ProductTable, type Product } from "./starter";

const PRODUCTS = [
  Object.freeze({
    id: "a",
    name: "Klawiatura",
    price: 299,
  }),
  Object.freeze({ id: "b", name: "Mysz", price: 99.5 }),
  Object.freeze({
    id: "c",
    name: "Monitor",
    price: 899.99,
  }),
] satisfies Product[];
Object.freeze(PRODUCTS);

describe("ProductTable", () => {
  it("sortuje widok po cenie bez mutowania zamrożonych propsów", () => {
    render(<ProductTable products={PRODUCTS} />);
    const items = within(
      screen.getByRole("list"),
    ).getAllByRole("listitem");

    expect(items.map((item) => item.textContent)).toEqual([
      "Mysz: 99.50 zł",
      "Klawiatura: 299.00 zł",
      "Monitor: 899.99 zł",
    ]);
    expect(PRODUCTS.map((product) => product.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("pokazuje poprawną sumę", () => {
    render(<ProductTable products={PRODUCTS} />);

    expect(
      screen.getByText("Razem: 1298.49 zł"),
    ).toBeInTheDocument();
  });

  it("dla tych samych propsów daje ten sam wynik po rerenderze", () => {
    const { container, rerender } = render(
      <ProductTable products={PRODUCTS} />,
    );
    const firstRender = container.textContent;

    rerender(<ProductTable products={PRODUCTS} />);

    expect(container.textContent).toBe(firstRender);
  });
});
