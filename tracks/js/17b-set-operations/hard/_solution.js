export function sharedTags(userTags, catalog) {
  const out = [];
  for (const tag of userTags) {
    if (catalog.has(tag)) out.push(tag);
  }
  return out.sort();
}
