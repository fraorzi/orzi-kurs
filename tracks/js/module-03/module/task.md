# Moduł 03 — Paginowany klient listy z cache

Zadanie **wieloplikowe**. Uzupełnij pliki w katalogu `src/`. Testy importują z
`src/index.js`, więc publiczne API musi zgadzać się co do nazw.

Budujesz klienta do listy z wyszukiwarką i „doładuj więcej": strony trzymasz w cache
(Map), zmiana zapytania anuluje wiszące żądanie, a wpisywanie w pole obsłuży debounce.

## `src/cache.js` — cache stron

- `createCache()` → `{ has, get, set, size, clear }`. Wpis kluczowany parą
  `(query, page)` — zbuduj klucz jednakowo w każdej metodzie (np. `\`${query}::${page}\``).
  - `has(query, page)` / `get(query, page)` — sprawdź / odczytaj.
  - `set(query, page, value)` — zapisz i **zwróć** `value`.
  - `size` (getter) — liczba wpisów; `clear()` — wyczyść.

## `src/debounce.js` — dławienie wpisywania

- `debounce(fn, waitMs)` → nowa funkcja. Każde wywołanie kasuje poprzedni timer
  i ustawia nowy; `fn` odpala się **raz**, z ostatnimi argumentami, po ciszy trwającej
  `waitMs`. Uchwyt timera trzymaj w domknięciu.

## `src/index.js` — klient listy

Re-eksportuj `createCache` i `debounce`. Dodatkowo:

- `createListClient(options = {})`, `options`: `{ fetchImpl = globalThis.fetch }`.
  Stan w domknięciu: `cache`, `currentQuery`, `currentPage`, `hasMore`, `items`
  (zebrane pozycje), `activeController`.
  - Pomocnik `fetchPage(query, page)`: jeśli jest w cache → zwróć z cache; inaczej
    utwórz `AbortController` (zapamiętaj jako `activeController`), zawołaj
    `fetchImpl(\`?q=${encodeURIComponent(query)}&page=${page}\`, { signal })`, sparsuj
    JSON `{ items, hasMore }`, zapisz do cache i zwróć.
  - `search(query)` — **anuluj** poprzednie żądanie (`activeController.abort()`),
    ustaw `currentQuery`, `currentPage = 1`, pobierz stronę 1, ustaw
    `items = [...data.items]` i `hasMore`; zwróć `items`.
  - `next()` — gdy `!hasMore` zwróć `items` bez zmian; inaczej pobierz kolejną stronę,
    **dołącz** jej `items` do zebranych, zaktualizuj `currentPage` i `hasMore`.
  - `getItems()` → zebrane pozycje; `query` / `page` / `hasMore` / `cacheSize` → gettery.

```js
import { createListClient, debounce } from "./src/index.js";

const client = createListClient();
const onType = debounce((q) => client.search(q), 250); // szukaj po ciszy
onType("re"); onType("rea"); onType("react");           // jeden fetch: "react"

await client.next();          // doładuj stronę 2 (dołączona do listy)
client.hasMore;               // czy jest co doładowywać
```
