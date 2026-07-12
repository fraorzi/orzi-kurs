export function styleItems(items, theme, computeStyle) {
  const style = computeStyle(theme);
  return items.map((item) => ({ ...item, style }));
}
