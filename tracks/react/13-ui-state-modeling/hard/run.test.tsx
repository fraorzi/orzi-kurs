import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  CheckoutFlow,
  checkoutReducer,
  type CheckoutState,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe("CheckoutFlow", () => {
  it("prowadzi przez błąd, retry i sukces bez sprzecznych stanów", async () => {
    const first = deferred<string>();
    const second = deferred<string>();
    let call = 0;
    const submitOrder = vi.fn(() => (
      call++ === 0 ? first.promise : second.promise
    ));
    const { user } = renderWithUser(
      <CheckoutFlow submitOrder={submitOrder} />,
    );

    expect(screen.getByRole("button", {
      name: "Przejdź do podsumowania",
    })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "Dodaj produkt" }));
    await user.click(screen.getByRole("button", {
      name: "Przejdź do podsumowania",
    }));
    expect(screen.getByRole("heading", { name: "Podsumowanie" }))
      .toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Złóż zamówienie" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Składanie zamówienia…",
    );
    expect(submitOrder).toHaveBeenCalledWith(1);

    await act(async () => {
      first.reject(new Error("offline"));
      await first.promise.catch(() => {});
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nie udało się złożyć zamówienia.",
    );

    await user.click(screen.getByRole("button", { name: "Ponów zamówienie" }));
    await act(async () => {
      second.resolve("ord_123");
      await second.promise;
    });
    expect(screen.getByRole("heading", {
      name: "Zamówienie ord_123 złożone",
    })).toBeInTheDocument();
  });

  it("ignoruje nielegalne przejścia i zachowuje identity stanu", () => {
    const cart: CheckoutState = { status: "cart", itemCount: 2 };

    expect(checkoutReducer(cart, {
      type: "submit_succeeded",
      orderId: "ord_invalid",
    })).toBe(cart);
    expect(checkoutReducer(cart, {
      type: "submit_failed",
      message: "boom",
    })).toBe(cart);
  });
});
