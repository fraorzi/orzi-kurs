export function styleItems(items, theme, computeStyle) {
  // Poprawne, ale computeStyle(theme) liczone dla KAŻDEGO elementu, choć theme się nie zmienia.
  return items.map((item) => ({ ...item, style: computeStyle(theme) }));
}
