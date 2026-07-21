# Hard — redaguj zagnieżdżone logi

Serializator diagnostyczny dostaje cudze struktury — dowolnie głębokie,
dowolnie duże, z sekretami. Zaimplementuj
`solve(value, maxDepth = 3, maxItems = 5)`:

- wartości pod kluczami zawierającymi `token`, `secret`, `password` lub
  `authorization` (case-insensitive) → `"[REDACTED]"` — zanim zejdziesz głębiej;
- struktury poniżej `maxDepth` → `"[TRUNCATED]"`;
- tablice przycinaj do `maxItems` elementów i **dołóż** znacznik
  `"[TRUNCATED]"`, gdy coś ucięto;
- prymitywy przepisuj bez zmian; wynik jest kopią — oryginału nie mutujesz.
