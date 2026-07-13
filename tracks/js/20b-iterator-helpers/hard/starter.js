export function firstTransformed(items, transform, keep, k) {
  // Poprawne, ale woła transform na WSZYSTKICH elementach i buduje dwie tablice pośrednie,
  // choć potrzeba tylko pierwszych k wyników.
  return items.map(transform).filter(keep).slice(0, k);
}
