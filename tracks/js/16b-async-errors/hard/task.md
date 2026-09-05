# Hard - `firstSuccess`: pierwszy sukces lub `AggregateError`

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `firstSuccess(promises)` - odwzorowanie semantyki `Promise.any`, ale
**napisane ręcznie** (bez `Promise.any` i `Promise.race`, żeby zrozumieć mechanikę).

- rozstrzyga się **pierwszym spełnionym** wynikiem, ignorując wcześniejsze odrzucenia,
- gdy **wszystkie** się odrzucą - odrzuca się `AggregateError`, którego pole `.errors`
  zawiera wszystkie przyczyny w kolejności wejścia,
- dla pustej listy odrzuca się `AggregateError` z pustą tablicą `.errors`.

```js
await firstSuccess([Promise.reject(new Error("a")), Promise.resolve("ok")]); // "ok"

try {
  await firstSuccess([Promise.reject(new Error("a")), Promise.reject(new Error("b"))]);
} catch (e) {
  e instanceof AggregateError;      // true
  e.errors.map((x) => x.message);   // ["a", "b"]
}
```

Ważne: pojedyncze odrzucenie **nie może** przedwcześnie odrzucić całości - dopiero gdy
skończą się wszystkie promisy bez sukcesu. Zlicz odrzucenia i dopiero na zerze zbuduj
`AggregateError`.
