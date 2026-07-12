## Hint 1

- `fibonacci`: trzymaj dwie ostatnie liczby `a`, `b`. W pętli `while (true)` najpierw
  `yield a`, potem przesuń parę: `[a, b] = [b, a + b]`.
- `accumulator`: `yield` jest wyrażeniem. `const x = yield total` — przy wznowieniu `x`
  dostaje to, co przekazano do `next(arg)`.

## Hint 2

```js
export function* fibonacci() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* accumulator() {
  let total = 0;
  while (true) {
    const x = yield total; // pierwsze next() zatrzyma się tutaj i zwróci total=0
    total += x;            // kolejne next(x) wznawiają: x = przekazany argument
  }
}
```

Pierwsze `next()` tylko dobiega do `yield total` i zwraca `0` — nie ma jeszcze `x`.
Dopiero drugie `next(10)` nadaje `x = 10`.
