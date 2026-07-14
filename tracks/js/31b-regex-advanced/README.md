# Wyrażenia regularne — techniki zaawansowane

Zagadnienie 31 pokrywa podstawy (grupy, flagi, `replace` z funkcją). Tu cztery techniki,
bez których nie zrobisz poprawnie realnych zadań: **lookbehind**, **escapowanie danych**,
**grupy nazwane** i **flaga sticky**.

## Lookbehind — „poprzedzone przez"

`(?<=...)` (pozytywny) i `(?<!...)` (negatywny) sprawdzają, co jest **przed** dopasowaniem,
nie włączając tego do wyniku:

```js
"$30 i €50".match(/(?<=\$)\d+/)[0]; // "30" — liczba poprzedzona $ (sam $ nie wchodzi)
"a1 b2".replace(/(?<![a])\d/g, "#"); // "a1 b#" — cyfra NIE poprzedzona 'a'
```

## Escapowanie danych do wzorca

Gdy budujesz `RegExp` z **danych użytkownika**, metaznaki (`.`, `*`, `(`…) zepsują wzorzec
(albo staną się wektorem ataku). Zanim wstawisz string do wzorca — **zescapuj** go:

```js
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& = całe dopasowanie
}
new RegExp(escapeRegExp("3.5")); // /3\.5/ — kropka literalna, nie „dowolny znak"
```

Bez tego `new RegExp("3.5")` dopasuje też `"3x5"` (bo `.` to dowolny znak).

## Grupy nazwane i `$<name>` w replace

`(?<name>...)` nazywa grupę. Odczyt: `match.groups.name`. W stringu zamiany: `$<name>`.

```js
"2024-07-14".replace(
  /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/,
  "$<d>/$<m>/$<y>",
); // "14/07/2024"
```

## Flaga sticky `y` — tokenizacja

`y` (sticky) dopasowuje **dokładnie od `lastIndex`** (bez przeskakiwania). To podstawa
tokenizerów/parserów: idziesz przez string kawałek po kawałku, `lastIndex` przesuwa się po
każdym dopasowaniu.

```js
const re = /\d+/y;
re.lastIndex = 0;
re.exec("12ab"); // ["12"], lastIndex = 2
re.exec("12ab"); // null (na pozycji 2 jest 'a', nie cyfra) — i UWAGA: lastIndex wraca do 0
```

**Pułapka:** przy nieudanym dopasowaniu `y`/`g` **zerują `lastIndex`**. Chcesz zgłosić pozycję
błędu — zapamiętaj `lastIndex` **przed** `exec`.

## Bonus: flaga `v` (unicode sets, ES2024, Node 20+)

`v` włącza operacje na zbiorach znaków, np. różnicę `--`:

```js
/[\p{Emoji}--\p{ASCII}]/v.test("😀"); // true;  .test("3") // false
```

## Kiedy używać

- Lookbehind: wycinanie wartości „po etykiecie" (`$`, `@`, `#`), bez zabierania etykiety.
- Escapowanie: **zawsze**, gdy wzorzec powstaje z danych zewnętrznych (search, filtry).
- Grupy nazwane: gdy wzorzec ma kilka pól — czytelniej niż `$1`, `$2`.
- Sticky: tokenizery, parsery, skanowanie formatu znak po znaku.

## Kiedy unikać

- Regex do parsowania zagnieżdżonych struktur (HTML, kod) — użyj prawdziwego parsera.
- Lookbehind o zmiennej długości w starych silnikach — w Node 22 działa, ale bądź świadom
  przenośności.

## Pułapki

- **Nieescapowane dane** w `new RegExp(...)` → błędny wzorzec lub ReDoS.
- **`y`/`g` zerują `lastIndex`** po nieudanym dopasowaniu — czytaj pozycję przed `exec`.
- Współdzielony `RegExp` z flagą `g`/`y` niesie stan (`lastIndex`) między wywołaniami —
  łatwo o „znikające" co drugie dopasowanie.
- `$<name>` działa tylko, gdy grupa faktycznie jest nazwana w tym wzorcu.
