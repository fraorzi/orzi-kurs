export function flattenTree(node) {
  const values = [node.value];
  for (const child of node.children ?? []) {
    values.push(...flattenTree(child));
  }
  return values;
}

export function findPath(node, target) {
  if (node.value === target) {
    return [node.value];
  }
  for (const child of node.children ?? []) {
    const sub = findPath(child, target);
    if (sub) {
      return [node.value, ...sub];
    }
  }
  return null;
}
