# Easy - policz bajty UTF-8

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Kolejka wiadomości ma limit rozmiaru w **bajtach**. Zaimplementuj
`solve(text, maxBytes)`:

- zakoduj `text` jako UTF-8 i zwróć bajty (`Uint8Array`);
- gdy zakodowany rozmiar przekracza `maxBytes`, rzuć `Error` - nawet jeśli
  liczba znaków (`text.length`) mieści się w limicie;
- rozmiar dokładnie równy limitowi jest dozwolony.

```ts
solve("abc", 3);  // 3 bajty - OK
solve("żżż", 3);  // 6 bajtów - Error, mimo że text.length === 3
```
