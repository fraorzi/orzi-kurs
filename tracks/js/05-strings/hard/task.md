# Hard - anagramy i slugi

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `findAnagrams(word, candidates)`

Ćwiczenie „Anagram" z Exercism: zwróć tych kandydatów, którzy są anagramami
`word`. Zasady:

- porównanie niezależne od wielkości liter,
- słowo **nie jest** własnym anagramem (`"stop"` nie jest anagramem `"stop"`,
  ale `"Stop"` też nie - bo to to samo słowo w innej wielkości),
- wynik zachowuje kolejność z `candidates` (oryginalną pisownię też).

```js
findAnagrams("listen", ["enlists", "google", "inlets", "banana"]); // ["inlets"]
findAnagrams("master", ["stream", "pigeon", "maters"]); // ["stream", "maters"]
findAnagrams("go", ["go", "GO", "og"]); // ["og"]
```

## 2. `slugify(title)`

Zamienia tytuł na slug URL: małe litery, polskie i inne diakrytyki sprowadzone
do ASCII, wszystko co nie jest literą/cyfrą → `"-"`, bez myślników wiodących,
końcowych i podwójnych.

Technika (MDN `String.prototype.normalize`): `normalize("NFD")` rozkłada znaki
na literę bazową + znak łączący (U+0300-U+036F), które można wyciąć regexem
lub filtrem. **Uwaga:** polskie `ł`/`Ł` nie jest znakiem złożonym - NFD go nie
rozłoży; potraktuj je osobno.

```js
slugify("Zażółć gęślą jaźń!");     // "zazolc-gesla-jazn"
slugify("Hello,  World");          // "hello-world"
slugify("--Już--gotowe--");        // "juz-gotowe"
```
