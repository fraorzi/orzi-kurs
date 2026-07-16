export interface CartLine {
  sku: string;
  price: number;
  qty: number;
}

export type CartSummary = {
  total: number;
  items: number;
};
