export function sumNested(value) {
  if (!Array.isArray(value)) {
    return value;
  }
  let sum = 0;
  for (const item of value) {
    sum += sumNested(item);
  }
  return sum;
}

export function treeSum(node) {
  let sum = node.value;
  for (const child of node.children ?? []) {
    sum += treeSum(child);
  }
  return sum;
}
