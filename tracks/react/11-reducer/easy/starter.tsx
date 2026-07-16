import { useReducer } from "react";

type QuantityAction =
  | { readonly type: "decreased" }
  | { readonly type: "increased" }
  | { readonly type: "reset"; readonly value: number };

function quantityReducer(state: number, action: QuantityAction): number {
  switch (action.type) {
    case "decreased":
      return state - 1;
    case "increased":
      return state + 1;
    case "reset":
      return 1;
  }
}

export function QuantityPicker({
  initialQuantity,
}: {
  readonly initialQuantity: number;
}) {
  const [quantity, dispatch] = useReducer(
    quantityReducer,
    initialQuantity,
  );

  return (
    <section>
      <output aria-label="Ilość">{quantity}</output>
      <button type="button" onClick={() => dispatch({ type: "decreased" })}>
        Zmniejsz
      </button>
      <button type="button" onClick={() => dispatch({ type: "increased" })}>
        Zwiększ
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: "reset", value: initialQuantity })}
      >
        Resetuj
      </button>
    </section>
  );
}
