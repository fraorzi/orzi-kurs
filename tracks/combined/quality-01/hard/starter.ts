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
  owner: string | undefined;
  actionLabel: string;
}

export function buildRows(items: readonly Item[], users: readonly User[]): Row[] {
  return items.map((item, index) => ({
    key: String(index),
    title: item.title,
    owner: users.find((user) => user.id === item.ownerId)?.name,
    actionLabel: "Edytuj",
  }));
}
