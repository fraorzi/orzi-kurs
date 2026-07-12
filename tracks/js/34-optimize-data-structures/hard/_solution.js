export function groupSum(transactions) {
  const result = {};
  for (const t of transactions) {
    result[t.category] = (result[t.category] ?? 0) + t.amount;
  }
  return result;
}
