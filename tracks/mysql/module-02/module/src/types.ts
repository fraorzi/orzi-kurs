export interface DbMetric {
  readonly operation: "findListing" | "placeOrder";
  readonly outcome: "success" | "retry" | "error";
  readonly attempt: number;
  readonly durationMs: number;
}

export interface PlaceOrderInput {
  readonly id: number;
  readonly requestId: string;
  readonly listingId: number;
  readonly quantity: number;
}

export type Observe = (metric: DbMetric) => void;
