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
  // TODO: jawny switch i assertNever po wszystkich wariantach
  return state;
}
