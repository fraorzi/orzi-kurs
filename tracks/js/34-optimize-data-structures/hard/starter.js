export function groupSum(transactions) {
  // Poprawne, ale O(kategorie·n): filtruje całą tablicę osobno dla każdej kategorii.
  const categories = [...new Set(transactions.map((t) => t.category))];
  const result = {};
  for (const category of categories) {
    result[category] = transactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  }
  return result;
}
