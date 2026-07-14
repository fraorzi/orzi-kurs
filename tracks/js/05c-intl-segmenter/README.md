# Intl.Segmenter — segmentacja słów i zdań

`str.split(" ")` łamie się na prawdziwym tekście: gubi interpunkcję, nie radzi sobie z
wieloma spacjami, apostrofami (`It's`), a w językach bez spacji (chiński, japoński) w ogóle
nie działa. `Intl.Segmenter` (ECMA-402, Node 16+) dzieli tekst **świadomie lokalizacji** na
grafemy, **słowa** albo **zdania** — zgodnie z regułami Unicode dla danego języka.

```js
const seg = new Intl.Segmenter("pl", { granularity: "word" });
for (const s of seg.segment("Ala ma kota, tak?")) {
  console.log(s.segment, s.isWordLike);
}
// "Ala" true | " " false | "ma" true | " " false | "kota" true | "," false | ...
```

## Trzy granularności

- `"grapheme"` — segmenty widzialnych znaków (patrz 05b: emoji ze ZWJ to 1 grafem).
- `"word"` — słowa i separatory; segment słowa ma `isWordLike === true`, separatory
  (spacje, interpunkcja) `false`.
- `"sentence"` — zdania; **każdy segment zawiera końcowe spacje** (np. `"Ala ma. "`), więc
  do porównań rób `.trim()`.

## Kształt segmentu

Iteracja po `seg.segment(text)` daje obiekty:

```js
{ segment: "Ala", index: 0, input: "Ala ma kota", isWordLike: true }
```

- `segment` — tekst kawałka, `index` — offset w oryginale, `input` — całe wejście.
- `isWordLike` istnieje **tylko** przy `granularity: "word"` (przy innych jest `undefined`).

Kolekcję dostaniesz zwykłym spreadem: `[...seg.segment(text)]`.

## Liczenie słów świadome lokalizacji

Kanoniczny wzorzec (MDN): policz segmenty z `isWordLike === true` — automatycznie pomija
spacje i interpunkcję.

```js
const count = [...seg.segment(text)].filter((s) => s.isWordLike).length;
```

## Kiedy używać

- Liczenie słów / czas czytania, dzielenie na zdania, tokenizacja tekstu naturalnego.
- Języki bez spacji między słowami (CJK) — `split` tam nie zadziała, `Segmenter` tak.
- Podświetlanie / obcinanie tekstu na granicy słowa lub zdania.

## Kiedy unikać

- Parsowanie **formatów** (CSV, kod, ścieżki) — tam masz sztywne reguły, użyj `split`/regex.
- Gdy naprawdę wystarczy `split(/\s+/)` na prostym ASCII i nie zależy Ci na interpunkcji.

## Pułapki

- **Segmenter jest kosztowny w budowie.** Twórz go **raz** i używaj wielokrotnie — nie
  `new Intl.Segmenter(...)` w pętli po dokumentach.
- Segmenty zdań **zawierają końcowe białe znaki** — pamiętaj o `.trim()` i odfiltrowaniu
  pustych.
- `isWordLike` bywa `undefined` dla granularności innej niż `"word"` — nie polegaj na nim
  poza słowami.
- Segmentacja słów to **nie to samo** co grafemy (05b): `[...str]` liczy code points,
  `Segmenter("word")` liczy słowa. To różne wymiary tekstu.
