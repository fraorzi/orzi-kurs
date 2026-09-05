import { useReducer } from "react";

export type CheckoutState =
  | { readonly status: "cart"; readonly itemCount: number }
  | {
      readonly status: "review";
      readonly itemCount: number;
    }
  | {
      readonly status: "submitting";
      readonly itemCount: number;
    }
  | {
      readonly status: "error";
      readonly itemCount: number;
      readonly message: string;
    }
  | {
      readonly status: "success";
      readonly orderId: string;
    };

export type CheckoutAction =
  | { readonly type: "item_added" }
  | { readonly type: "review_requested" }
  | { readonly type: "edit_requested" }
  | { readonly type: "submit_requested" }
  | {
      readonly type: "submit_succeeded";
      readonly orderId: string;
    }
  | {
      readonly type: "submit_failed";
      readonly message: string;
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
