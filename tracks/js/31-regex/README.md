# Wyrażenia regularne (praktyka)

Regex to wzorzec dopasowywany do tekstu — do walidacji, wyszukiwania, ekstrakcji
i podmiany. W JS regex jest osobnym typem (`RegExp`), tworzonym literałem `/wzorzec/flagi`
albo `new RegExp("wzorzec", "flagi")`.

## Metody

```js
/\d+/.test("abc123");            // true — czy pasuje gdziekolwiek
"a1b2".match(/\d/g);             // ["1", "2"] — wszystkie dopasowania (z flagą g)
[..."a=1&b=2".matchAll(/(\w)=(\d)/g)]; // dopasowania z grupami (iterator)
"hello".replace(/l/g, "L");      // "heLLo"
```

- `str.match(re)` — bez `g` zwraca pierwsze dopasowanie z grupami; z `g` tablicę stringów.
- `str.matchAll(re)` — (wymaga `g`) iterator dopasowań **z grupami** — najlepsze do ekstrakcji.
- `str.replace(re, x)` — `x` może być stringiem albo **funkcją**.

## Flagi

- `g` — globalnie (wszystkie, nie tylko pierwsze),
- `i` — ignoruj wielkość liter,
- `m` — `^`/`$` dopasowują początek/koniec **linii**,
- `s` — `.` łapie też nową linię,
- `u` — tryb Unicode.

## Klasy znaków i kwantyfikatory

- `\d` cyfra, `\w` znak słowa `[A-Za-z0-9_]`, `\s` biały znak; wielkie (`\D`,`\W`,`\S`) = negacja.
- `[abc]` zbiór, `[^abc]` negacja, `[a-z]` zakres.
- `*` (0+), `+` (1+), `?` (0/1), `{n}`, `{n,}`, `{n,m}`.
- `^` początek, `$` koniec, `\b` granica słowa.

## Grupy

- **Przechwytujące** `(...)` — zapamiętują fragment (w `match`/`matchAll` pod indeksami).
- **Nazwane** `(?<name>...)` — dostępne przez `match.groups.name` (czytelniej niż indeksy).
- **Nieprzechwytujące** `(?:...)` — grupują bez zapamiętywania.
- **Lookahead** `(?=...)` / `(?!...)` — warunek „przed", bez konsumowania znaków.

```js
"2020-05-17".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/).groups;
// { year: "2020", month: "05", day: "17" }
```

## replace z funkcją

Gdy podmiana zależy od dopasowania, przekaż funkcję — dostaje dopasowanie (i grupy),
zwraca zamiennik:

```js
"hello world".replace(/\b\w/g, (c) => c.toUpperCase()); // "Hello World"
```

## Kiedy używać

- Walidacja formatu (email, kod pocztowy, hex-kolor), ekstrakcja pól z tekstu.
- Podmiana wzorcowa (formatowanie, sanityzacja, tokenizacja).
- Parsowanie prostych, regularnych formatów (query string, daty ISO, logi).

## Kiedy unikać

- Parsowanie **nieregularnych/zagnieżdżonych** języków (HTML, JSON, kod) — użyj parsera,
  nie regexa.
- Bardzo złożone wzorce, które nikt nie odczyta — rozbij na kroki albo nazwij grupy.
- Wzorce podatne na **catastrophic backtracking** (zagnieżdżone `(a+)+`) — mogą zawiesić.

## Pułapki

- **Flaga `g` + `.test()`/`.exec()`** — `lastIndex` się przesuwa; kolejne `test` na tym
  samym regexie dają inne wyniki. Do wielu dopasowań używaj `matchAll`.
- `match` bez `g` zwraca grupy; z `g` — tylko stringi (bez grup). Do grup globalnie → `matchAll`.
- Znaki specjalne w danych trzeba **escapować** (`.` `*` `(` itd.), gdy mają być literalne.
- `\d` w JS łapie też cyfry spoza ASCII w trybie `u` — zwykle chcesz `[0-9]` dla ścisłości.
- Zapomniana kotwica `^...$` → wzorzec pasuje do **fragmentu**, nie całości (np. walidacja).
