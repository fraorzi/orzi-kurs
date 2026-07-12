export function totalCost(orders, priceOf) {
  const cache = new Map();
  const getPrice = (id) => {
    if (!cache.has(id)) {
      cache.set(id, priceOf(id));
    }
    return cache.get(id);
  };

  let total = 0;
  for (const order of orders) {
    total += order.qty * getPrice(order.productId);
  }
  return total;
}
