export interface Product {
  readonly id: string;
  readonly tenantId: string;
  readonly name: string;
  readonly stock: number;
}
export interface Alert {
  readonly id: string;
  readonly label: string;
}
export type InventoryRole = "viewer" | "manager" | "owner";
