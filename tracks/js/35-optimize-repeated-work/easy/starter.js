export function totalCost(orders, priceOf) {
  // Poprawne, ale priceOf jest wołane dla KAŻDEGO zamówienia — także dla powtórzonych produktów.
  let total = 0;
  for (const order of orders) {
    total += order.qty * priceOf(order.productId);
  }
  return total;
}
