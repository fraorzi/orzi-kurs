## Hint 1

Zwróć **nazwaną** funkcję i dopnij do niej metody:

```js
const debounced = (...args) => { /* ... */ };
debounced.cancel = () => { /* ... */ };
debounced.flush = () => { /* ... */ };
return debounced;
```

Możesz dopiąć metody do funkcji strzałkowej przypisanej do `const`. W domknięciu trzymaj
`timer`, `lastArgs` i (dla `flush`) ostatni `result`.

## Hint 2

Wydziel odpalenie do helpera, żeby `flush` i callback timera używały tego samego kodu:

```js
function invoke() {
  result = fn(...lastArgs);
  lastArgs = null;
}
```

## Hint 3

- `cancel`: `clearTimeout`, wyzeruj `timer` i zapamiętane argumenty — nic się nie odpali.
- `flush`: jeśli `timer !== null`, wyczyść go i wywołaj `invoke()` **od razu**; na końcu
  zwróć `result`. Wyzerowanie `timer`/argów po odpaleniu chroni przed podwójnym strzałem
  (timer już nie wystrzeli, bo go wyczyściłeś).
