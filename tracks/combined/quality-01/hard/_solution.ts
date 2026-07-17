export interface Item { id: string; ownerId: string; title: string } export interface User { id: string; name: string }
export function buildRows(items: Item[], users: User[]) { const byId = new Map(users.map((user) => [user.id, user])); return items.map((item) => ({ key: item.id, title: item.title, owner: byId.get(item.ownerId)?.name ?? "Nieznany", actionLabel: "Edytuj " + item.title })); }

