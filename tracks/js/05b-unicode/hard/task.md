# Hard - grafemy (Intl.Segmenter)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Grafem (klaster grafemowy) to znak „widziany" przez człowieka - może składać się z wielu
punktów kodowych: flaga to dwa symbole regionalne, rodzina `👨‍👩‍👧‍👦` to 7 punktów sklejonych
znakami ZWJ, a `é` w formie NFD to litera + akcent. Do liczenia i cięcia po grafemach służy
`Intl.Segmenter`.

## 1. `graphemeCount(str)`

Zwraca liczbę grafemów (znaków widzialnych).

```js
graphemeCount("a😀b");        // 3
graphemeCount("👨‍👩‍👧‍👦");  // 1   (7 punktów kodowych, ale jeden grafem)
graphemeCount("🇵🇱");          // 1   (flaga = dwa symbole regionalne)
```

## 2. `truncateGraphemes(str, max)`

Zwraca pierwsze `max` grafemów, **nie tnąc** żadnego klastra w środku. Jeśli napis ma nie
więcej niż `max` grafemów - zwraca go w całości.

```js
truncateGraphemes("a😀b🎉c", 3); // "a😀b"
truncateGraphemes("hi", 5);       // "hi"
truncateGraphemes("👨‍👩‍👧‍👦x", 1); // "👨‍👩‍👧‍👦"  (całej rodziny nie wolno rozciąć)
```

Utwórz jeden `Intl.Segmenter` z `granularity: "grapheme"` i użyj go w obu funkcjach.
Każdy segment ma pole `.segment` z tekstem grafemu.
