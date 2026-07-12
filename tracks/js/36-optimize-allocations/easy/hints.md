## Hint 1

`[...acc, ...arr]` tworzy **nową** tablicę z całej zawartości `acc` przy każdym kroku
`reduce` — im dłuższy `acc`, tym więcej kopiowania. Zamiast tego dokładaj do jednego
bufora, który rośnie na miejscu.

## Hint 2

```js
export function flatten(arrays) {
  const out = [];
  for (const arr of arrays) {
    for (const item of arr) out.push(item);
  }
  return out;
}
```

Mutacja `out` jest bezpieczna — to lokalny bufor, którego nikt z zewnątrz nie widzi.
Alternatywy: `out.push(...arr)` w pętli albo wbudowane `arrays.flat()`.
