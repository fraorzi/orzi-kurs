# Stringi

Stringi w JS są **niemutowalne** — każda "modyfikacja" tworzy nowy string.
`str[0] = "X"` po cichu nic nie robi.

## Template literals

Backticki dają interpolację i wielolinijkowość:

```js
const name = "Ala";
`Cześć, ${name}!`;        // interpolacja dowolnego wyrażenia
`pierwsza
druga linia`;              // \n bez escape'ów
```

## Metody, które musisz znać

```js
"JavaScript".slice(0, 4);    // "Java" (koniec wyłącznie; ujemne liczą od końca)
"abc".at(-1);                // "c" — w przeciwieństwie do [i] przyjmuje ujemne
"  x  ".trim();              // "x"
"ab".repeat(3);              // "ababab"
"7".padStart(3, "0");        // "007"
"a-b-c".split("-");          // ["a", "b", "c"]
["a", "b"].join("+");        // "a+b"
"Kot".toLowerCase();         // "kot"
"abc".includes("b");         // true; też startsWith / endsWith
"a.b.c".replace(".", "-");  // "a-b.c" — TYLKO PIERWSZE wystąpienie!
"a.b.c".replaceAll(".", "-"); // "a-b-c"
```

Idiom **split → map → join** załatwia większość transformacji tekstu:

```js
"background-color"
  .split("-")             // ["background", "color"]
  .map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1))
  .join("");              // "backgroundColor"
```

## Porównywanie i znaki narodowe

Porównania `<`/`>` idą po kodach znaków — `"ż" > "z"` bywa zaskoczeniem.
Do sortowania po ludzku: `a.localeCompare(b, "pl")`. Do usuwania diakrytyków:
`normalize("NFD")` rozkłada znak na literę bazową + znak łączący, który można
wyciąć. Uwaga: **polskie ł nie jest znakiem złożonym** — NFD go nie rozłoży,
trzeba je potraktować osobno.

## Kiedy używać

- template literals do każdego sklejania stringów z wartościami,
- `slice` zamiast `substring`/`substr` (jedna metoda wystarczy, obsługuje ujemne),
- `split`/`join` do transformacji "po kawałkach",
- `padStart`/`padEnd` do formatowania (numeracja, maskowanie, wyrównanie).

## Kiedy unikać

- konkatenacji `+` w wielu krokach — nieczytelna; template literal albo `join`,
- regexów tam, gdzie wystarczy `includes`/`startsWith`/`split`,
- porównywania stringów z różną wielkością liter bez normalizacji.

## Pułapki

- `replace` zamienia tylko pierwsze wystąpienie — do wszystkich: `replaceAll`,
- `length` liczy jednostki UTF-16, nie znaki — emoji `"🙂".length === 2`,
- `str[i]` nie działa z ujemnymi indeksami (zwraca undefined) — od tego jest `at`,
- `toUpperCase`/`toLowerCase` NIE mutują — zwracają nowy string,
- `split("")` tnie po jednostkach UTF-16 (psuje emoji); bezpieczniej `[...str]`.
