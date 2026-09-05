import { loadLowStockAlerts } from "./catalog-store";
import { getCatalog } from "./catalog";

export async function InventoryDashboard({
  tenantId,
}: {
  tenantId: string;
}) {
  const [products, alerts] = await Promise.all([
    getCatalog(tenantId),
    loadLowStockAlerts(tenantId),
  ]);
  return (
    <main>
      <h1>Magazyn</h1>
      <p>Produkty: {products.length}</p>
      <p>Alerty: {alerts.length}</p>
    </main>
  );
}
