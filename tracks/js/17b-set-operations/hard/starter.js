export function sharedTags(userTags, catalog) {
  // Poprawne, ale iteruje po CAŁYM katalogu — O(catalog), choć userTags jest małe.
  const out = [];
  for (const tag of catalog) {
    if (userTags.has(tag)) out.push(tag);
  }
  return out.sort();
}
