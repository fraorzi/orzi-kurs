export type CartState = {
  quantities: Readonly<Record<string, number>>;
  coupon: string | null;
};

export type CartAction =
  | { type: "itemAdded"; productId: string; quantity: number }
  | { type: "itemRemoved"; productId: string }
  | { type: "couponApplied"; code: string }
  | { type: "cleared" };

export function assertNever(value: never): never {
  throw new Error(`Nieobsługiwana akcja: ${JSON.stringify(value)}`);
}

export function reduceCart(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "itemAdded": {
      if (action.quantity < 1) throw new RangeError("quantity");
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.productId]:
            (state.quantities[action.productId] ?? 0) + action.quantity,
        },
      };
    }
    case "itemRemoved": {
      if (!(action.productId in state.quantities)) return state;
      const quantities = { ...state.quantities };
      delete quantities[action.productId];
      return { ...state, quantities };
    }
    case "couponApplied":
      return { ...state, coupon: action.code.toUpperCase() };
    case "cleared":
      return { quantities: {}, coupon: null };
  }
  return assertNever(action);
}
