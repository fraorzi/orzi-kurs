# Unicode w stringach

String w JS to ciąg **jednostek kodowych UTF-16** (16-bitowych), nie „znaków". Dla znaków
z podstawowego zakresu (BMP: łacińskie litery, cyfry, większość CJK) jedna jednostka = jeden
znak. Ale znaki spoza BMP (emoji, część pisma historycznego, symbole matematyczne) zajmują
**dwie** jednostki — tzw. **parę zastępczą (surrogate pair)**. Dlatego `"😀".length === 2`.

Warto rozróżniać trzy poziomy „długości":

| Poziom | Co liczy | Jak zmierzyć |
|---|---|---|
| jednostki UTF-16 | `.length` | `str.length` |
| punkty kodowe (code points) | pełne znaki Unicode | `[...str].length` |
| grafemy (klastry) | znaki „widziane" przez człowieka | `Intl.Segmenter` |

## `.length` kłamie o znakach

```js
"a".length;   // 1
"😀".length;  // 2 — jeden emoji, dwie jednostki UTF-16
"é".length;   // 1 lub 2 — zależy od formy normalizacji (patrz niżej)
```

## Iteracja daje punkty kodowe, nie jednostki

`for..of`, spread `[...str]` i `Array.from(str)` używają iteratora stringa, który chodzi po
**punktach kodowych** — nie rozrywa par zastępczych. `split("")` i indeksowanie `str[i]`
chodzą po jednostkach i **rozrywają** emoji:

```js
"a😀b".split("");   // ["a", "\ud83d", "\ude00", "b"]  — emoji rozbity na pół!
[..."a😀b"];        // ["a", "😀", "b"]                — poprawnie
```

Stąd klasyczny bug: `str.split("").reverse().join("")` psuje emoji. Odwracaj przez
`[...str].reverse().join("")`. Uwaga: to naprawia pary zastępcze, ale **nie** klastry
grafemowe — odwrócenie tekstu z flagami, emoji ZWJ albo akcentami w formie NFD nadal
je rozerwie; w pełni poprawne odwracanie wymaga cięcia po grafemach (`Intl.Segmenter`,
sekcja niżej).

## Punkty kodowe: `codePointAt` / `fromCodePoint`

`codePointAt(i)` zwraca pełny punkt kodowy (do 21 bitów), `charCodeAt(i)` tylko jednostkę
(16 bitów). Analogicznie `String.fromCodePoint` vs `String.fromCharCode`.

```js
"😀".codePointAt(0);          // 128512
String.fromCodePoint(128512); // "😀"
"😀".charCodeAt(0);           // 55357 — tylko połowa pary
```

## Normalizacja: te same „znaki", różne bajty

`é` można zapisać jako jeden punkt kodowy (`U+00E9`, forma **NFC**) albo jako `e` + znak
łączący akcent (`U+0065 U+0301`, forma **NFD**). Wyglądają identycznie, ale nie są równe:

```js
"é" === "é";                          // false
"é".normalize("NFC") === "é".normalize("NFC"); // true
```

Przed porównaniem tekstu z różnych źródeł (klawiatura, plik, API) normalizuj go do wspólnej
formy — inaczej „identyczne" napisy nie przejdą porównania ani wyszukiwania.

## Grafemy: to, co człowiek widzi jako jeden znak

Jeden grafem (klaster grafemowy) może składać się z wielu punktów kodowych:

- flaga `🇵🇱` = dwa symbole regionalne (2 punkty kodowe, 1 grafem),
- rodzina `👨‍👩‍👧‍👦` = 7 punktów kodowych sklejonych znakami ZWJ (1 grafem),
- `é` w formie NFD = litera + akcent (2 punkty kodowe, 1 grafem).

Do liczenia i cięcia po tym, co widzi użytkownik, służy `Intl.Segmenter`:

```js
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
[...seg.segment("👨‍👩‍👧‍👦")].length; // 1
```

## Kiedy używać

- **`[...str]` / `for..of`** — zawsze, gdy iterujesz „znaki": odwracanie, liczenie, cięcie.
- **`normalize()`** — przy porównywaniu/wyszukiwaniu/deduplikacji tekstu z różnych źródeł.
- **`Intl.Segmenter`** — limity długości „widzialnej" (np. licznik znaków w formularzu),
  ucinanie z wielokropkiem, kursor w edytorze.

## Kiedy unikać

- Dla czystego ASCII (adresy e-mail, tokeny, kod) `.length` i `str[i]` są w porządku i szybsze.
- `Intl.Segmenter` tworzy obiekt i alokuje — nie wołaj go w gorącej pętli po znaku; utwórz raz
  i przetwarzaj partiami.

## Pułapki

- `str.length` to jednostki UTF-16, nie znaki — nie używaj do limitów widzialnej długości.
- `split("")`, `str[i]`, `charAt`, `slice` po indeksie jednostki mogą **rozciąć** emoji.
- `charCodeAt` zwraca połówkę pary zastępczej dla emoji — użyj `codePointAt`.
- Bez `normalize()` wizualnie równe napisy bywają `!==` (typowe przy tekście z macOS vs Windows).
