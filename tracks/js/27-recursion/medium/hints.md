## Hint 1

- `sumNested`: przypadek bazowy to „to nie tablica" — wtedy zwróć wartość. Inaczej iteruj
  i sumuj `sumNested(item)` dla każdego elementu.
- `treeSum`: zacznij od `node.value`, potem dodaj `treeSum(child)` dla każdego dziecka.
  `children ?? []` chroni przed pominiętym `children`.

## Hint 2

```js
export function sumNested(value) {
  if (!Array.isArray(value)) return value; // baza
  let sum = 0;
  for (const item of value) sum += sumNested(item);
  return sum;
}

export function treeSum(node) {
  let sum = node.value;
  for (const child of node.children ?? []) sum += treeSum(child);
  return sum;
}
```
