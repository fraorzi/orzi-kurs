import { Suspense } from "react";
import { loadLowStockAlerts } from "./catalog-store";
import { getCatalog } from "./catalog";

async function CatalogSection({ tenantId }: { readonly tenantId: string }) {
  const products = await getCatalog(tenantId);
  return <p>Produkty: {products.length}</p>;
}

async function AlertsSection({ tenantId }: { readonly tenantId: string }) {
  const alerts = await loadLowStockAlerts(tenantId);
  return <p>Alerty: {alerts.length}</p>;
}

export function InventoryDashboard({ tenantId }: { readonly tenantId: string }) {
  return (
    <main>
      <h1>Magazyn</h1>
      <Suspense fallback={<p>Ładowanie katalogu…</p>}><CatalogSection tenantId={tenantId} /></Suspense>
      <Suspense fallback={<p>Ładowanie alertów…</p>}><AlertsSection tenantId={tenantId} /></Suspense>
    </main>
  );
}
