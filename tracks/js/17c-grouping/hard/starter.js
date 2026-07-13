export function attachUsers(orders, users) {
  // Poprawne, ale O(zamówienia·użytkownicy): find po całej liście users dla każdego zamówienia.
  return orders.map((order) => ({
    ...order,
    user: users.find((u) => u.id === order.userId) ?? null,
  }));
}
