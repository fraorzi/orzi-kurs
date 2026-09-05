# Medium - `createWeakCache`: leniwy cache trzymany słabo

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `createWeakCache(compute)` - cache pojedynczej wartości pochodnej. `compute`
to funkcja bez argumentów zwracająca **obiekt** (kosztowny do policzenia). Zwróć `{ get }`:

- pierwsze `get()` woła `compute()`, zapamiętuje wynik w `WeakRef` i go zwraca,
- kolejne `get()` zwracają zapamiętany wynik przez `deref()` - **bez** ponownego liczenia,
  dopóki wynik jest jeszcze osiągalny,
- jeśli `deref()` zwróci `undefined` (obiekt zebrany przez GC), `get()` liczy od nowa.

```js
let calls = 0;
const cache = createWeakCache(() => {
  calls++;
  return { data: 42 };
});

const a = cache.get(); // liczy → calls === 1
const b = cache.get(); // z cache (a wciąż trzymane) → calls === 1
a === b;               // true
```

Dzięki słabemu trzymaniu wynik może zniknąć pod presją pamięci zamiast wyciekać - to
przewaga nad zwykłą zmienną. Trzymanie mocnej referencji (jak `a` wyżej) gwarantuje trafienie.
