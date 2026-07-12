## Hint 1

`arr.indexOf(arr[i])` przechodzi tablicę od początku przy **każdym** `i` — to pętla
w pętli, czyli O(n²). Zamiast pytać tablicę „gdzie po raz pierwszy jest ta wartość",
pamiętaj widziane wartości w strukturze z szybkim `has`.

## Hint 2

`Set` daje `has`/`add` w O(1). Skanuj raz od lewej: jeśli wartość już jest w zbiorze —
to pierwszy duplikat; inaczej dodaj i idź dalej.

```js
export function firstDuplicate(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return null;
}
```

Cała pętla jest teraz O(n).
