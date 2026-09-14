import { useReducer } from "react";

export type CheckoutState =
  | { status: "cart"; itemCount: number }
  | {
      status: "review";
      itemCount: number;
    }
  | {
      status: "submitting";
      itemCount: number;
    }
  | {
      status: "error";
      itemCount: number;
      message: string;
    }
  | {
      status: "success";
      orderId: string;
    };

export type CheckoutAction =
  | { type: "item_added" }
  | { type: "review_requested" }
  | { type: "edit_requested" }
  | { type: "submit_requested" }
  | {
      type: "submit_succeeded";
      orderId: string;
    }
  | {
      type: "submit_failed";
      message: string;
    };

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  if (
    action.type === "item_added" &&
    state.status === "cart"
  ) {
    return { ...state, itemCount: state.itemCount + 1 };
  }
  if (
    action.type === "review_requested" &&
    state.status === "cart" &&
    state.itemCount > 0
  ) {
    return { status: "review", itemCount: state.itemCount };
  }
  return state;
}

export function CheckoutFlow({
  submitOrder,
}: {
  submitOrder: (itemCount: number) => Promise<string>;
}) {
  const [state, dispatch] = useReducer(checkoutReducer, {
    status: "cart",
    itemCount: 0,
  });

  async function submit() {
    if (
      state.status !== "review" &&
      state.status !== "error"
    ) {
      return;
    }
    const itemCount = state.itemCount;
    dispatch({ type: "submit_requested" });
    try {
      const orderId = await submitOrder(itemCount);
      dispatch({ type: "submit_succeeded", orderId });
    } catch {
      dispatch({
        type: "submit_failed",
        message: "Nie udało się złożyć zamówienia.",
      });
    }
  }

  if (state.status === "cart") {
    return (
      <section>
        <output aria-label="Produkty">
          {state.itemCount}
        </output>
        <button
          type="button"
          onClick={() => dispatch({ type: "item_added" })}
        >
          Dodaj produkt
        </button>
        <button
          type="button"
          disabled={state.itemCount === 0}
          onClick={() =>
            dispatch({ type: "review_requested" })
          }
        >
          Przejdź do podsumowania
        </button>
      </section>
    );
  }
  if (state.status === "review") {
    return (
      <section>
        <h1>Podsumowanie</h1>
        <output aria-label="Produkty">
          {state.itemCount}
        </output>
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "edit_requested" })
          }
        >
          Edytuj koszyk
        </button>
        <button type="button" onClick={submit}>
          Złóż zamówienie
        </button>
      </section>
    );
  }
  if (state.status === "submitting") {
    return <p role="status">Składanie zamówienia…</p>;
  }
  if (state.status === "error") {
    return (
      <section>
        <p role="alert">{state.message}</p>
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "edit_requested" })
          }
        >
          Edytuj koszyk
        </button>
        <button type="button" onClick={submit}>
          Ponów zamówienie
        </button>
      </section>
    );
  }
  return <h1>Zamówienie {state.orderId} złożone</h1>;
}
