import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  ShoppingCart,
  type CartItem,
} from "./starter";

const ITEMS: readonly CartItem[] = [
  { id: "keyboard", name: "Klawiatura", quantity: 1 },
  { id: "mouse", name: "Mysz", quantity: 2 },
];

describe("ShoppingCart", () => {
  it("zwiększa wybrany produkt i usuwa inny", async () => {
    const { user } = renderWithUser(<ShoppingCart initialItems={ITEMS} />);

    await user.click(
      screen.getByRole("button", { name: "Zwiększ Klawiatura" }),
    );
    expect(screen.getByRole("status", { name: "Ilość Klawiatura" }))
      .toHaveTextContent("2");
    expect(screen.getByRole("status", { name: "Ilość Mysz" }))
      .toHaveTextContent("2");

    await user.click(screen.getByRole("button", { name: "Usuń Mysz" }));
    expect(screen.queryByText("Mysz")).not.toBeInTheDocument();
    expect(ITEMS).toEqual([
      { id: "keyboard", name: "Klawiatura", quantity: 1 },
      { id: "mouse", name: "Mysz", quantity: 2 },
    ]);
  });
});
