import { Suspense, use } from "react";

export interface Revenue {
  readonly formatted: string;
}

export interface OrdersSummary {
  readonly count: number;
}

function RevenueCard({ revenuePromise }: { readonly revenuePromise: Promise<Revenue> }) {
  const revenue = use(revenuePromise);
  return <article><h2>Przychód</h2><p>{revenue.formatted}</p></article>;
}

function OrdersCard({
  ordersPromise,
}: {
  readonly ordersPromise: Promise<OrdersSummary>;
}) {
  const orders = use(ordersPromise);
  return <article><h2>Zamówienia</h2><p>{orders.count}</p></article>;
}

export function Dashboard({
  revenuePromise,
  ordersPromise,
}: {
  readonly revenuePromise: Promise<Revenue>;
  readonly ordersPromise: Promise<OrdersSummary>;
}) {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense fallback={<p role="status">Ładowanie przychodu…</p>}>
        <RevenueCard revenuePromise={revenuePromise} />
      </Suspense>
      <Suspense fallback={<p role="status">Ładowanie zamówień…</p>}>
        <OrdersCard ordersPromise={ordersPromise} />
      </Suspense>
    </main>
  );
}
