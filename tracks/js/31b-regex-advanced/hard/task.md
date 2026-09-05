# Hard - tokenizer na fladze sticky `y`

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `tokenize(expr)` - rozbija wyrażenie arytmetyczne na tokeny, używając flagi
**sticky (`y`)** i `lastIndex`. Tokeny:

- liczby całkowite (`\d+`),
- operatory i nawiasy: `+`, `-`, `*`, `/`, `(`, `)`.

Białe znaki są **pomijane** (nie są tokenami). Na nieoczekiwany znak rzuć `SyntaxError`
z pozycją: `` `nieoczekiwany znak na pozycji ${pos}` ``.

```js
tokenize("12 + 3 * (4-5)"); // ["12", "+", "3", "*", "(", "4", "-", "5", ")"]
tokenize("   ");            // []
tokenize("1 + @");          // 💥 SyntaxError: nieoczekiwany znak na pozycji 4
```

Dlaczego sticky: `y` dopasowuje **dokładnie od `lastIndex`** - idziesz przez string kawałek po
kawałku, `lastIndex` przesuwa się po każdym dopasowaniu. Gdy w bieżącej pozycji nic nie
pasuje, masz błąd składni **na tej pozycji**.

**Pułapka:** przy nieudanym `exec` flaga `y` **zeruje `lastIndex` do 0** - więc pozycję błędu
zapamiętaj **przed** wywołaniem `exec`, a nie odczytuj po nim.
