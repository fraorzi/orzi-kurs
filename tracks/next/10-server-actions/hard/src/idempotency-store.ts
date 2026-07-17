export interface OrderResult {
  readonly orderId: string;
}

export type BeginResult =
  | { readonly kind: "acquired" }
  | { readonly kind: "completed"; readonly result: OrderResult }
  | { readonly kind: "conflict" }
  | { readonly kind: "pending" };

export async function beginIdempotent(
  _key: string,
  _fingerprint: string,
): Promise<BeginResult> {
  return { kind: "acquired" };
}

export async function completeIdempotent(_key: string, _result: OrderResult): Promise<void> {}
export async function releaseIdempotent(_key: string): Promise<void> {}
