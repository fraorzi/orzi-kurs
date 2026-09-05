import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  ShoppingCart,
  increaseQuantity,
  removeItem,
  type CartItem,
} from "./starter";

const ITEMS: CartItem[] = [
  { id: "keyboard", name: "Klawiatura", quantity: 1 },
  { id: "mouse", name: "Mysz", quantity: 2 },
];

describe("ShoppingCart", () => {
  it("zwiększa ilość bez mutacji i kopiuje tylko zmieniony produkt", () => {
    const items = ITEMS.map((item) => ({ ...item }));
    items.forEach(Object.freeze);
    Object.freeze(items);
    const increased = increaseQuantity(items, "keyboard");
    expect(increased).not.toBe(items);
    expect(increased[0]).not.toBe(items[0]);
    expect(increased[0].quantity).toBe(2);
    expect(increased[1]).toBe(items[1]);
    expect(items[0].quantity).toBe(1);
    expect(increaseQuantity(items, "missing")).toEqual(
      items,
    );
  });

  it("usuwa produkt bez mutacji tablicy i zachowuje obiekty pozostałych produktów", () => {
    const items = ITEMS.map((item) => ({ ...item }));
    Object.freeze(items);
    const remaining = removeItem(items, "mouse");
    expect(remaining).not.toBe(items);
    expect(remaining).toEqual([items[0]]);
    expect(remaining[0]).toBe(items[0]);
    expect(items).toHaveLength(2);
    expect(removeItem(items, "missing")).toEqual(items);
  });

  it("zwiększa wybrany produkt i usuwa inny", async () => {
    const { user } = renderWithUser(
      <ShoppingCart initialItems={ITEMS} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Zwiększ Klawiatura",
      }),
    );
    expect(
      screen.getByRole("status", {
        name: "Ilość Klawiatura",
      }),
    ).toHaveTextContent("2");
    expect(
      screen.getByRole("status", { name: "Ilość Mysz" }),
    ).toHaveTextContent("2");

    await user.click(
      screen.getByRole("button", { name: "Usuń Mysz" }),
    );
    expect(
      screen.queryByText("Mysz"),
    ).not.toBeInTheDocument();
    expect(ITEMS).toEqual([
      { id: "keyboard", name: "Klawiatura", quantity: 1 },
      { id: "mouse", name: "Mysz", quantity: 2 },
    ]);
  });
});
