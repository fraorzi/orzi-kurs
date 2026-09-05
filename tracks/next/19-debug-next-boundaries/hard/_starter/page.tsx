import { Suspense } from "react";

export interface ActivityItem {
  readonly id: string;
  readonly label: string;
}

export async function getActivity(): Promise<
  readonly ActivityItem[]
> {
  return [{ id: "a-1", label: "Wdrożono wersję 42" }];
}

function Activity({
  items,
}: {
  items: readonly ActivityItem[];
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}

export default async function Page() {
  const items = await getActivity();
  return (
    <main>
      <h1>Aktywność</h1>
      <Suspense fallback={<p>Ładowanie aktywności…</p>}>
        <Activity items={items} />
      </Suspense>
    </main>
  );
}
