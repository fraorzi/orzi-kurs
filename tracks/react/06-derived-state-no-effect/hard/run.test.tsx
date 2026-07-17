import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { OrderCheckout } from "./starter";

describe("OrderCheckout", () => {
  it("wykonuje operację dokładnie dla każdego submitu", async () => {
    const onConfirm = vi.fn();
    const { user } = renderWithUser(
      <OrderCheckout unitPriceCents={2500} onConfirm={onConfirm} />,
    );
    const submit = screen.getByRole("button", {
      name: "Potwierdź zamówienie",
    });

    await user.click(submit);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenLastCalledWith({
      quantity: 1,
      totalCents: 2500,
    });

    const quantity = screen.getByRole("spinbutton", { name: "Ilość" });
    await user.clear(quantity);
    await user.type(quantity, "2");
    expect(screen.getByRole("status", { name: "Łącznie" }))
      .toHaveTextContent("5000");
    expect(onConfirm).toHaveBeenCalledTimes(1);

    await user.click(submit);
    await user.click(submit);
    expect(onConfirm).toHaveBeenCalledTimes(3);
    expect(onConfirm).toHaveBeenLastCalledWith({
      quantity: 2,
      totalCents: 5000,
    });
  });
});
