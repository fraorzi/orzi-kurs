export function common(a, b) {
  return [...new Set(a).intersection(new Set(b))].sort((x, y) => x - y);
}

export function combined(a, b) {
  return [...new Set(a).union(new Set(b))].sort((x, y) => x - y);
}
