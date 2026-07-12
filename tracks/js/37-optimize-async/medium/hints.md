## Hint 1

Pool to `limit` „pracowników" działających równolegle. Każdy w pętli bierze **kolejny
wolny indeks** ze wspólnego licznika `next`, wykonuje `worker`, zapisuje wynik pod tym
indeksem i bierze następny — aż zadania się skończą. `Promise.all` czeka na wszystkich
pracowników.

## Hint 2

```js
export async function pooledMap(items, worker, limit) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await worker(items[i]);
    }
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, run);
  await Promise.all(runners);
  return results;
}
```

Skoro pracowników jest dokładnie `limit`, aktywnych zadań nigdy nie ma więcej niż `limit`.
Zapis po indeksie (`results[i]`) zachowuje kolejność niezależnie od czasu zakończenia.
