import "server-only";
import type { InventoryRole, Product } from "./types";

export async function getUserId(): Promise<string | null> { return null; }
export async function findProduct(_productId: string): Promise<Product | null> { return null; }
export async function findMembership(_tenantId: string, _userId: string): Promise<{ readonly role: InventoryRole } | null> { return null; }
export async function setStock(_productId: string, _stock: number): Promise<void> {}
