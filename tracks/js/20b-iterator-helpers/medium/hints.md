## Hint 1

Nie materializuj źródła do tablicy — to by pobrało wszystko (a źródło bywa nieskończone).
Zbuduj leniwy pipeline na iteratorze: `filter`, potem `take`, potem `toArray`.

## Hint 2

```js
export function firstMatching(iterator, predicate, n) {
  return Iterator.from(iterator).filter(predicate).take(n).toArray();
}
```

`take(n)` przerywa ciągnięcie ze źródła po `n` przefiltrowanych elementach — stąd dokładnie
tyle pobrań, ile potrzeba.
