import { Suspense } from "react";

export interface ActivityItem {
  readonly id: string;
  readonly label: string;
}

export async function getActivity(): Promise<readonly ActivityItem[]> {
  return [{ id: "a-1", label: "Wdrożono wersję 42" }];
}

async function Activity() {
  const items = await getActivity();
  return <ul>{items.map((item) => <li key={item.id}>{item.label}</li>)}</ul>;
}

export default function Page() {
  return (
    <main>
      <h1>Aktywność</h1>
      <Suspense fallback={<p>Ładowanie aktywności…</p>}>
        <Activity />
      </Suspense>
    </main>
  );
}
