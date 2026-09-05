# Hard - wylicz stan workflow dokumentu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Panel redakcyjny pokazuje badge stanu przy każdej lokalizacji dokumentu:
`new`, `modified` albo `published`. Zaimplementuj
`solve(draft, published)`, porównując treść (nie metadane) obu wersji w
jednym locale:

- `published === null` (ta lokalizacja nigdy nie była publikowana) →
  `"new"`, niezależnie od treści draftu;
- `draft === published` (treść draftu identyczna z opublikowaną) →
  `"published"` - nic do zatwierdzenia;
- w pozostałych przypadkach (treści się różnią) → `"modified"` -
  są niezatwierdzone zmiany czekające na publikację.
