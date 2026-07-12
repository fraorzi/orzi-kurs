export function intersection(a, b) {
  const inB = new Set(b);
  const seen = new Set();
  const out = [];
  for (const x of a) {
    if (inB.has(x) && !seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

export function union(a, b) {
  return [...new Set([...a, ...b])];
}

export function difference(a, b) {
  const inB = new Set(b);
  const seen = new Set();
  const out = [];
  for (const x of a) {
    if (!inB.has(x) && !seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}
