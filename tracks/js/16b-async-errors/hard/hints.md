## Hint 1

Zwróć `new Promise((resolve, reject) => { … })`. Dla każdej wejściowej promisy podłącz
`Promise.resolve(p).then(resolve, onReject)` — pierwsze `resolve` wygrywa, kolejne są
ignorowane (promisa rozstrzyga się raz).

## Hint 2

Trzymaj `errors` (tablicę o długości wejścia, zapisuj po indeksie) i licznik `remaining`.
W `onReject` zapisz błąd, zmniejsz `remaining`; gdy dojdzie do `0`, `reject(new AggregateError(errors, "…"))`.
Pustą listę odrzuć od razu przed pętlą.

## Hint 3

```js
export function firstSuccess(promises) {
  return new Promise((resolve, reject) => {
    const errors = new Array(promises.length);
    let remaining = promises.length;
    if (remaining === 0) {
      reject(new AggregateError([], "wszystkie promisy odrzucone"));
      return;
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        remaining -= 1;
        if (remaining === 0) reject(new AggregateError(errors, "wszystkie promisy odrzucone"));
      });
    });
  });
}
```
