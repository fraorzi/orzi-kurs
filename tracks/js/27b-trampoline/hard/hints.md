## Hint 1

Zamiast rekurencji trzymaj **własny stos** — zwykłą tablicę elementów do przetworzenia —
i pętlę `while (stack.length > 0)`. Start: `const stack = [input]`.

## Hint 2

W każdej rundzie zdejmij element (`stack.pop()`). Jeśli to tablica, wrzuć jej elementy z
powrotem na stos; jeśli nie — dopisz do wyniku. Kolejność zachowasz, wrzucając dzieci **od
końca** (bo `pop` zdejmuje z końca):

```js
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
```

Stos to tablica na stercie, więc głębokość zagnieżdżenia nie obciąża stosu wywołań — dlatego
działa dla dziesiątek tysięcy poziomów, gdzie rekurencja rzuca `RangeError`.
