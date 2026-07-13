export function attachUsers(orders, users) {
  const byId = new Map(users.map((u) => [u.id, u]));
  return orders.map((order) => ({
    ...order,
    user: byId.get(order.userId) ?? null,
  }));
}
