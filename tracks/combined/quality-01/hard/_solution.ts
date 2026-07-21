export interface Item {
  id: string;
  ownerId: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Row {
  key: string;
  title: string;
  owner: string;
  actionLabel: string;
}

const UNKNOWN_OWNER = "Nieznany";

export function buildRows(items: readonly Item[], users: readonly User[]): Row[] {
  const ownerById = new Map(users.map((user) => [user.id, user]));

  return items.map((item) => ({
    key: item.id,
    title: item.title,
    owner: ownerById.get(item.ownerId)?.name ?? UNKNOWN_OWNER,
    actionLabel: `Edytuj ${item.title}`,
  }));
}
