# `WeakRef` i `FinalizationRegistry`

`WeakMap`/`WeakSet` trzymają **słabe klucze**. `WeakRef` idzie dalej: to słaba referencja do
**pojedynczego obiektu** — pozwala go osiągnąć, ale **nie chroni** przed zebraniem przez GC.

```js
const ref = new WeakRef({ big: "data" });
ref.deref(); // { big: "data" }  — dopóki obiekt żyje
// ...jeśli nic innego go nie trzyma, GC może go zebrać...
ref.deref(); // undefined        — po zebraniu
```

`deref()` zwraca obiekt **albo `undefined`**, jeśli został już zebrany. Musisz obsłużyć oba
przypadki — nigdy nie zakładaj, że `deref()` zwróci wartość.

## `FinalizationRegistry` — sprzątanie po zebraniu

Pozwala zarejestrować callback, który (być może) uruchomi się **po** zebraniu obiektu.
Dostaje „held value" — dane potrzebne do sprzątnięcia (np. klucz w mapie), a **nie** sam
obiekt (inaczej trzymałbyś go przy życiu):

```js
const registry = new FinalizationRegistry((key) => {
  cache.delete(key); // posprzątaj wpis po zebranym obiekcie
});
registry.register(obj, "klucz-obj");
```

## Niedeterminizm — to nie jest mechanizm sterowania

Kiedy (i czy w ogóle) GC zbierze obiekt oraz odpali finalizer — **nie wiadomo**. To zależy
od implementacji silnika, obciążenia pamięci i chwili. Dlatego:

- **nigdy** nie opieraj logiki programu na tym, że `deref()` zwróci `undefined`,
- **nigdy** nie zakładaj, że callback `FinalizationRegistry` się wykona (przy wyjściu z
  procesu może nie odpalić wcale),
- callbacki mogą przyjść w dowolnej kolejności i z dowolnym opóźnieniem.

To narzędzia do **optymalizacji i sprzątania**, nie do poprawności.

## Kiedy używać (rzadko)

- **Cache wartości pochodnych**, które w razie potrzeby można przeliczyć od nowa — trzymasz
  je słabo, żeby pod presją pamięci mogły zniknąć zamiast powodować wyciek.
- **Zwalnianie zasobów zewnętrznych** (uchwyty, połączenia) powiązanych z obiektem JS —
  jako sieć bezpieczeństwa, gdy ktoś zapomni zwolnić ręcznie.

## Kiedy NIE używać (prawie zawsze)

- Do **danych prywatnych per obiekt** albo cache kluczowanego obiektem → użyj `WeakMap`
  (patrz zagadnienie 18). Jest prostszy i deterministyczny w zakresie API.
- Do jakiejkolwiek **logiki sterowania** (liczenie referencji, „czy obiekt jeszcze żyje")
  — to droga do trudnych, niedeterministycznych bugów.
- Gdy zależy Ci na natychmiastowym zwolnieniu → zrób to jawnie (`close()`/`dispose()`),
  nie licz na GC.

## Pułapki

- `deref()` może zwrócić `undefined` w **dowolnym** momencie — zawsze sprawdzaj wynik.
- „Held value" przekazana do `register` **nie może** (pośrednio) wskazywać na sam obiekt —
  inaczej utrzymasz go przy życiu i zniweczysz cały sens słabej referencji.
- Zarejestrowany obiekt można wyrejestrować tokenem (`register(obj, held, token)` +
  `unregister(token)`), gdy zwolnisz zasób ręcznie wcześniej.
