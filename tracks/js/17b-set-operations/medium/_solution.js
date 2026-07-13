export function intersection(a, b) {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  const out = new Set();
  for (const x of small) {
    if (large.has(x)) out.add(x);
  }
  return out;
}

export function difference(a, b) {
  const out = new Set();
  for (const x of a) {
    if (!b.has(x)) out.add(x);
  }
  return out;
}

export function isSubset(a, b) {
  for (const x of a) {
    if (!b.has(x)) return false;
  }
  return true;
}
