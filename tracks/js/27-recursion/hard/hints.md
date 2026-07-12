## Hint 1

- `flattenTree`: zacznij tablicę od `node.value`, potem dla każdego dziecka dorzuć
  (`push(...)`) wynik `flattenTree(child)`.
- `findPath`: baza — `node.value === target` → `[node.value]`. Inaczej przeszukuj dzieci;
  gdy któreś zwróci ścieżkę (nie `null`), doklej `node.value` z przodu. Nic nie znaleziono → `null`.

## Hint 2

```js
export function findPath(node, target) {
  if (node.value === target) return [node.value];
  for (const child of node.children ?? []) {
    const sub = findPath(child, target);
    if (sub) return [node.value, ...sub]; // znaleziono w poddrzewie
  }
  return null;
}
```

Kluczowe: sprawdzaj wynik rekurencji (`if (sub)`) i tylko wtedy dobudowuj ścieżkę —
to „backtracking", cofasz się, gdy poddrzewo nie zawiera celu.
