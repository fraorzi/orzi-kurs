import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface State {
  count: number;
}

export type Action =
  | { type: "add"; amount: number }
  | { type: "remove"; amount: number }
  | { type: "reset" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      return { count: state.count + Math.max(0, action.amount) };
    }
    case "remove": {
      return { count: Math.max(0, state.count - Math.max(0, action.amount)) };
    }
    case "reset": {
      return { count: 0 };
    }
    default: {
      return action satisfies never;
    }
  }
}

const CartContext = createContext<State | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state] = useReducer(reducer, { count: 0 });
  return <CartContext value={state}>{children}</CartContext>;
}

export function useCart(): State {
  const state = useContext(CartContext);
  if (!state) {
    throw new Error("useCart wymaga CartProvider");
  }
  return state;
}
