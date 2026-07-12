## Hint 1

Sekret liniowości: `array.includes(x)` przeszukuje tablicę za każdym razem (O(n)),
więc `a.filter(x => b.includes(x))` to O(n·m). Zamiast tego zbuduj **raz** `new Set(b)`
i pytaj `set.has(x)` — to O(1). Cała pętla po `a` jest wtedy O(n).

## Hint 2

`intersection` i `difference` różnią się tylko warunkiem (`inB.has(x)` vs `!inB.has(x)`).
Deduplikację wyniku załatw drugim Setem `seen`:

```js
export function intersection(a, b) {
  const inB = new Set(b);
  const seen = new Set();
  const out = [];
  for (const x of a) {
    if (inB.has(x) && !seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}
```

`union` jest najprostszy: `[...new Set([...a, ...b])]` — Set sam usuwa duplikaty
i pamięta kolejność wstawiania.
