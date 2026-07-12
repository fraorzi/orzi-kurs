# Immutability w praktyce

Niemutowalność = zamiast **zmieniać** obiekt w miejscu, tworzysz **nowy** z naniesioną
zmianą. To fundament przewidywalnego kodu: porównania przez referencję (`prev !== next`)
działają, historia stanu jest zachowana, React/Redux wykrywają zmiany. JS nie wymusza
niemutowalności — trzeba jej pilnować wzorcami (spread, `structuredClone`, `Object.freeze`).

## Niemutowalna aktualizacja przez spread

Nie mutuj — kopiuj i nadpisz:

```js
// obiekt
const next = { ...user, name: "Ala" };     // nowy obiekt, user bez zmian
// tablica: dodanie
const added = [...items, newItem];
// tablica: usunięcie
const without = items.filter((x) => x !== toRemove);
// tablica: zmiana elementu
const mapped = items.map((x, i) => (i === idx ? newValue : x));
```

Metody **mutujące** (unikaj przy stanie): `push`, `pop`, `splice`, `sort`, `reverse`,
`shift`. Ich niemutujące odpowiedniki: spread, `slice`, `toSorted`, `toReversed`,
`with(i, v)` (nowsze).

## structuredClone — głęboka kopia

Spread kopiuje **płytko** — zagnieżdżone obiekty są współdzielone przez referencję.
Do pełnej, głębokiej kopii służy `structuredClone`:

```js
const copy = structuredClone(original);
copy.nested.x = 9; // nie dotyka original.nested.x
```

`structuredClone` radzi sobie z zagnieżdżeniem, tablicami, `Date`, `Map`, `Set`, cyklami.
Stary trik `JSON.parse(JSON.stringify(x))` gubi `undefined`, `Date` (zamienia na string),
funkcje i wywala się na cyklach — `structuredClone` jest lepszy. (Nie sklonuje funkcji —
rzuci `DataCloneError`.)

## Object.freeze — zamrożenie

`Object.freeze` blokuje dodawanie/usuwanie/zmianę właściwości. Ale jest **płytki** —
zagnieżdżone obiekty pozostają zmienne:

```js
const frozen = Object.freeze({ n: { x: 1 } });
frozen.n = {};   // w strict: TypeError
frozen.n.x = 9;  // przechodzi! freeze jest płytki
Object.isFrozen(frozen); // true
```

Pełne zamrożenie = **deepFreeze** (rekurencyjnie zamroź zagnieżdżone). W trybie strict
(moduły ES) próba zapisu do zamrożonego rzuca `TypeError`.

## Object.freeze vs const

To dwie różne rzeczy:
- `const x = {}` — nie możesz **przypisać** nowego obiektu do `x`, ale możesz zmieniać
  jego zawartość (`x.a = 1`).
- `Object.freeze(x)` — możesz podmienić zmienną, ale nie zmienisz **zawartości** obiektu.

## Kiedy używać

- Stan aplikacji (React/Redux) — niemutowalne aktualizacje pozwalają tanio wykryć zmianę
  i cofać/odtwarzać stan.
- Współdzielone dane, których nikt nie powinien przypadkiem zmienić — `Object.freeze`.
- Snapshot danych do porównania „przed/po" — `structuredClone`.

## Kiedy unikać

- Gorące pętle na wielkich strukturach — ciągłe kopiowanie bywa kosztowne; wtedy lokalna
  mutacja bufora (i niemutowalny wynik na końcu) albo biblioteki ze structural sharing.
- Bardzo głębokie struktury klonowane co klatkę — mierz, `structuredClone` nie jest darmowy.

## Pułapki

- **Spread jest płytki** — `{ ...state, list: state.list }` współdzieli `list`; mutacja
  „kopii" psuje oryginał. Do zmian w głąb kopiuj każdy poziom ścieżki.
- **freeze jest płytki** — bez deepFreeze zagnieżdżone obiekty nadal mutowalne.
- `JSON.parse(JSON.stringify(x))` gubi typy — nie używaj do klonowania danych z `Date`,
  `Map`, `undefined`.
- Mutujące metody tablic (`sort`, `reverse`, `splice`) zmieniają oryginał — na stanie
  używaj `toSorted`/`toReversed`/`slice`/spread.
- `Object.freeze` w trybie non-strict po cichu ignoruje zapis (żadnego błędu) — łatwo
  przeoczyć bug; moduły ES są strict, więc tam poleci `TypeError`.
