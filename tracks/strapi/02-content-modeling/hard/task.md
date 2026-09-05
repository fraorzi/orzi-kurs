# Hard - renderuj kontrakt dynamic zone

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Strona ma sekcję złożoną z bloków `page.hero`, `page.quote` i
`page.gallery` w dowolnej kolejności wybranej przez redakcję - to dynamic
zone. Zaimplementuj `solve(blocks)`, który zamienia każdy blok na jego
reprezentację tekstową:

- `page.hero` → `hero:<title>`;
- `page.quote` → `quote:<text>`;
- `page.gallery` → `gallery:<liczba zdjęć>`;
- obsłuż `__component` przez `switch` **wyczerpująco**, żeby dodanie nowego typu bloku do
  unii `Block` bez rozszerzenia `solve` psuło kompilację, a nie po cichu gubiło nieznany
  blok w produkcji;
- zachowaj kolejność bloków z wejścia, pusta lista wejściowa daje pustą
  listę wyjściową.
