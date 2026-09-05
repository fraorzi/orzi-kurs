import { Suspense, use } from "react";

export interface Revenue {
  readonly formatted: string;
}

export interface OrdersSummary {
  readonly count: number;
}

function DashboardContent({
  dataPromise,
}: {
  dataPromise: Promise<[Revenue, OrdersSummary]>;
}) {
  const [revenue, orders] = use(dataPromise);
  return (
    <>
      <article>
        <h2>Przychód</h2>
        <p>{revenue.formatted}</p>
      </article>
      <article>
        <h2>Zamówienia</h2>
        <p>{orders.count}</p>
      </article>
    </>
  );
}

export function Dashboard({
  revenuePromise,
  ordersPromise,
}: {
  revenuePromise: Promise<Revenue>;
  ordersPromise: Promise<OrdersSummary>;
}) {
  return (
    <main>
      <h1>Dashboard</h1>
      <Suspense
        fallback={
          <p role="status">Ładowanie dashboardu…</p>
        }
      >
        <DashboardContent
          dataPromise={Promise.all([
            revenuePromise,
            ordersPromise,
          ])}
        />
      </Suspense>
    </main>
  );
}
