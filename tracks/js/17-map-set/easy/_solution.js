export function unique(arr) {
  return [...new Set(arr)];
}

export function countWords(words) {
  const counts = new Map();
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}
