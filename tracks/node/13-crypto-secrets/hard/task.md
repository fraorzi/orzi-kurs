# Hard — wyprowadź klucz przez scrypt

Przechowujesz weryfikator sekretu (np. hasła CLI) odporny na brutforce.
Zaimplementuj `solve(secret)`:

- wygeneruj 16-bajtową losową sól i wyprowadź 32-bajtowy klucz przez
  `crypto.scrypt` (wersja promisowa przez `util.promisify`);
- zwróć `encoded` w formacie `<salt hex>:<klucz hex>` oraz asynchroniczny
  `verify(candidate)`;
- `verify` wyprowadza klucz z kandydata **tą samą solą** i porównuje przez
  `timingSafeEqual` — nigdy przez porównanie stringów;
- dwa rekordy tego samego sekretu mają różne `encoded` (sól per rekord).
