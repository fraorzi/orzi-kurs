import "server-only";
import type { Alert, Product } from "./types";

export async function loadCatalog(_tenantId: string): Promise<readonly Product[]> { return []; }
export async function loadLowStockAlerts(_tenantId: string): Promise<readonly Alert[]> { return []; }
