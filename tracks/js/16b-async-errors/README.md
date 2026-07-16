# Błędy asynchroniczne

Synchroniczne `try/catch` łapie tylko błędy rzucone **w trakcie synchronicznego wykonania**.
Odrzucona promisa, której nie `await`-ujesz, przeleci obok:

```js
try {
  fetchData(); // zwraca promisę — NIE czekamy na nią
} catch (e) {
  // tu NIC nie trafi, nawet jeśli promisa się odrzuci
}
```

Żeby `try/catch` złapał błąd asynchroniczny, musisz na promisę **poczekać**:

```js
try {
  await fetchData(); // teraz odrzucenie staje się wyjątkiem tutaj
} catch (e) {
  // złapane
}
```

## `throw` w funkcji async = odrzucenie promisy

Rzucenie w funkcji `async` (albo w `.then`) nie wywala programu — zamienia się w **odrzuconą
promisę**. Kod, który ją wywołał, zobaczy błąd dopiero przy `await`/`.catch`:

```js
async function load() {
  throw new Error("boom"); // to samo co: return Promise.reject(new Error("boom"))
}
load().catch((e) => console.log(e.message)); // "boom"
```

## Częściowe błędy: `Promise.allSettled`

`Promise.all` odrzuca się, gdy **pierwsza** promisa zawiedzie — reszty wyników nie zobaczysz
(zasada „wszystko albo nic"). Gdy chcesz wyniki **wszystkich**, także tych nieudanych, użyj
`Promise.allSettled` — nigdy się nie odrzuca, zwraca tablicę deskryptorów:

```js
await Promise.allSettled([Promise.resolve(1), Promise.reject(new Error("x"))]);
// [ { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: Error("x") } ]
```

## Pierwszy sukces: `Promise.any` i `AggregateError`

`Promise.any` rozstrzyga się **pierwszym sukcesem**, ignorując wcześniejsze odrzucenia.
Dopiero gdy **wszystkie** zawiodą, odrzuca się jednym `AggregateError` z polem `.errors`
(tablicą wszystkich przyczyn):

```js
try {
  await Promise.any([Promise.reject(new Error("a")), Promise.reject(new Error("b"))]);
} catch (e) {
  e instanceof AggregateError; // true
  e.errors.map((x) => x.message); // ["a", "b"]
}
```

(Kontrast: `Promise.race` rozstrzyga się pierwszą **rozstrzygniętą** promisą — obojętnie,
sukcesem czy błędem.)

## `unhandledrejection`

Odrzucona promisa, której nikt nie obsłużył (`await`/`.catch`), wywołuje globalne zdarzenie
`unhandledrejection` (w Node: `process.on("unhandledRejection", …)`; w przeglądarce:
`window.addEventListener("unhandledrejection", …)`). To sygnał **buga**, nie mechanizm
obsługi błędów — każdą promisę, która może się odrzucić, obsłuż u źródła.

## Kiedy czego używać

- **`await` w `try/catch`** — pojedyncza operacja, która może zawieść.
- **`allSettled`** — wiele niezależnych operacji, chcesz wynik każdej (np. odświeżenie
  kilku widgetów, gdzie jeden padnięty nie ma blokować reszty).
- **`all`** — wiele operacji, gdzie brak którejkolwiek unieważnia całość (np. równoległe
  fragmenty jednej odpowiedzi).
- **`any`** — kilka równoważnych źródeł, wystarczy pierwszy działający (np. mirror/CDN).

## Kiedy unikać

- Nie używaj globalnego `unhandledrejection` jako zwykłego mechanizmu obsługi błędów.
- Nie zamieniaj każdego błędu na `null`; konsument traci wtedy przyczynę i nie odróżnia
  awarii od prawidłowego braku danych.
- Nie stosuj `allSettled`, jeśli brak jednego wyniku unieważnia całą operację.

## Pułapki

- `try/catch` bez `await` **nie łapie** odrzuceń — to najczęstszy błąd w kodzie async.
- `array.forEach(async …)` gubi promisy: `forEach` nie czeka, więc `try/catch` wokół niego
  nic nie złapie, a błędy stają się `unhandledrejection`.
- `Promise.all` po pierwszym błędzie **porzuca** pozostałe wyniki — jeśli ich potrzebujesz,
  to `allSettled`.
- `AggregateError` ma przyczyny w `.errors` (liczba mnoga), nie w `.message`.
