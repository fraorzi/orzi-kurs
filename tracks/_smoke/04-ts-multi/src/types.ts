export interface CartLine {
  sku: string;
  price: number;
  qty: number;
}

// TODO: zastąp `unknown` typem podsumowania: łączna wartość + liczba sztuk.
export type CartSummary = unknown;
