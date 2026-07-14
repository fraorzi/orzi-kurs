export function flattenDeep(input) {
  const out = [];
  const stack = [input];
  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i]);
      }
    } else {
      out.push(item);
    }
  }
  return out;
}
