export interface Item { id: string; ownerId: string; title: string } export interface User { id: string; name: string }
export function buildRows(items: Item[], users: User[]) { return items.map((item, index) => ({ key: String(index), title: item.title, owner: users.find((user) => user.id === item.ownerId)?.name, actionLabel: "Edytuj" })); }

