# Hard — renderuj kontrakt dynamic zone

Strona ma sekcję złożoną z bloków `page.hero`, `page.quote` i
`page.gallery` w dowolnej kolejności wybranej przez redakcję — to dynamic
zone. Zaimplementuj `solve(blocks)`, który zamienia każdy blok na jego
reprezentację tekstową:

- `page.hero` → `hero:<title>`;
- `page.quote` → `quote:<text>`;
- `page.gallery` → `gallery:<liczba zdjęć>`;
- obsłuż `__component` przez `switch` **wyczerpująco** — gałąź `default`
  ma używać `block satisfies never`, żeby dodanie nowego typu bloku do
  unii `Block` bez rozszerzenia `solve` psuło kompilację, a nie ciszej
  gubiło nieznany blok w produkcji;
- zachowaj kolejność bloków z wejścia, pusta lista wejściowa daje pustą
  listę wyjściową.
