import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface State {
  count: number;
}

export type Action =
  | { type: "add"; amount: number }
  | { type: "remove"; amount: number }
  | { type: "reset" };

export function reducer(state: State, _action: Action): State {
  return state;
}

const CartContext = createContext<State | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state] = useReducer(reducer, { count: 0 });
  return <CartContext value={state}>{children}</CartContext>;
}

export function useCart(): State {
  return useContext(CartContext) ?? { count: 0 };
}
