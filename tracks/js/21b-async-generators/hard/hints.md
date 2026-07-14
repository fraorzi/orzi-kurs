## Hint 1

Klucz do leniwości: przerwij konsumpcję **od razu** po `n`-tym elemencie. `for await...of`
z `return` w środku wywoła `.return()` na źródle i przestanie je ciągnąć — więc kolejny
element nie zostanie pobrany.

## Hint 2

```js
export async function* firstN(asyncIterable, n) {
  if (n <= 0) return; // nie dotykaj źródła
  let count = 0;
  for await (const value of asyncIterable) {
    yield value;
    count += 1;
    if (count >= n) return; // stop: źródło nie dostanie kolejnego next()
  }
}
```

Uwaga na kolejność: `yield value` **przed** sprawdzeniem licznika — inaczej zgubisz ostatni
element albo pobierzesz jeden za dużo. Sprawdź `n <= 0` na starcie, żeby dla `n = 0` w ogóle
nie zaczynać iteracji po źródle.
