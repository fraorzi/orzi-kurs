import {
  loadWorkspace,
  type WorkspaceServices,
} from "./workspace-data";

interface WorkspacePageProps {
  slug: string;
  services: WorkspaceServices;
}

export async function WorkspacePage({
  slug,
  services,
}: WorkspacePageProps) {
  const { user, flags, orders } = await loadWorkspace(
    slug,
    services,
  );

  return (
    <main
      data-navigation={
        flags.compactNavigation ? "compact" : "full"
      }
    >
      <h1>Workspace: {user.name}</h1>
      <ul aria-label="Ostatnie zamówienia">
        {orders.map((order) => (
          <li key={order.id}>
            {order.id}: {order.total} zł
          </li>
        ))}
      </ul>
    </main>
  );
}
