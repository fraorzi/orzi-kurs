import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { OrderForm } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("OrderForm", () => {
  it("czyta wysyłany produkt z FormData statusu", async () => {
    const operation = deferred();
    const placeOrder = vi.fn(() => operation.promise);
    const { user } = renderWithUser(<OrderForm placeOrder={placeOrder} />);
    const select = screen.getByRole("combobox", { name: "Produkt" });

    await user.selectOptions(select, "Monitor");
    await user.click(screen.getByRole("button", { name: "Zamów" }));

    expect(placeOrder).toHaveBeenCalledWith("Monitor");
    expect(select).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Zamawianie: Monitor…",
    );

    await act(async () => {
      operation.resolve();
      await operation.promise;
    });
    expect(select).toBeEnabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
