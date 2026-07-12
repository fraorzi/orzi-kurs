# JSON i serializacja

`JSON.stringify` zamienia wartość na tekst, `JSON.parse` — tekst z powrotem na wartość.
Oba mają drugi (i trzeci) argument, który daje pełną kontrolę: **replacer**, **reviver**
i wcięcia. Do tego dochodzi metoda `toJSON` i pułapki (cykle, gubione typy).

## stringify: replacer i wcięcia

Trzeci argument to wcięcie (liczba spacji albo string):

```js
JSON.stringify({ a: 1, b: 2 }, null, 2);
// {
//   "a": 1,
//   "b": 2
// }
```

Drugi argument (replacer) filtruje, co trafia do wyniku:

- **tablica kluczy** — whitelist pól: `JSON.stringify(obj, ["a", "c"])` zostawia tylko `a` i `c`,
- **funkcja** `(key, value) => ...` — wywoływana dla każdej pary; zwróć `undefined`, by
  **pominąć** pole, albo zmienioną wartość.

```js
JSON.stringify(user, (key, value) =>
  key === "password" ? undefined : value,
);
```

## Co ginie w stringify

- `undefined`, funkcje i symbole — **pomijane** w obiektach (w tablicach → `null`),
- `Date` → string ISO (traci typ),
- `Map`/`Set` → `{}` (nie serializują się),
- `NaN`/`Infinity` → `null`.

## parse: reviver

Drugi argument `JSON.parse` to reviver `(key, value) => ...` — przekształca wartości przy
wczytywaniu. Klasyczne użycie: odtworzenie `Date` z ISO stringów:

```js
JSON.parse(text, (key, value) =>
  typeof value === "string" && /^\d{4}-\d\d-\d\dT/.test(value)
    ? new Date(value)
    : value,
);
```

## toJSON

Jeśli obiekt ma metodę `toJSON()`, `JSON.stringify` użyje jej wyniku zamiast obiektu.
Tak działa `Date` (jego `toJSON` zwraca ISO string). Możesz zdefiniować własną kontrolę
serializacji obiektu.

## Cykle rzucają

`JSON.stringify` na strukturze z **cyklem** (obiekt referuje sam siebie) rzuca
`TypeError: Converting circular structure to JSON`. Trzeba wykryć cykl replacerem
(np. `WeakSet` widzianych obiektów).

## Kiedy używać

- Wymiana danych z API/plikami, `localStorage`, logi.
- Głęboka kopia **prostych** danych (bez `Date`/`Map`/funkcji) — choć `structuredClone`
  jest lepszy.
- Porównanie wartości „po treści": `JSON.stringify(a) === JSON.stringify(b)` (z zastrzeżeniami).

## Kiedy unikać

- Klonowanie danych z `Date`, `Map`, `Set`, `undefined`, cyklami → użyj `structuredClone`.
- Porównywanie przez `JSON.stringify` gdy kolejność kluczy może się różnić — da fałszywy
  wynik (`{a,b}` vs `{b,a}`).
- Wielkie struktury w gorącej pętli — serializacja jest kosztowna.

## Pułapki

- **Cykl → wyjątek.** Bez replacera z detekcją `stringify` się wywali.
- **`undefined`/funkcje znikają** — pole po prostu nie pojawi się w JSON-ie.
- **`Date` staje się stringiem** — po `parse` masz string, nie `Date` (chyba że reviver).
- Kolejność kluczy w JSON zależy od kolejności wstawiania — porównania bywają zwodnicze.
- `JSON.parse` na niepoprawnym wejściu **rzuca** `SyntaxError` — opakuj w `try/catch`.
