# Medium - ogranicz zasoby wejścia

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Rekord z kolejki kosztuje zasoby zanim go przetworzysz. Zaimplementuj
walidator `solve(input)`:

- wejście musi być zwykłym obiektem, inaczej `Error`;
- `type` z allow-listy: `"email"` albo `"report"`;
- `text`: string o rozmiarze maksymalnie 1024 **bajtów** (nie znaków!);
- `cost`: skończona liczba w zakresie 0-1000 (`NaN`/`Infinity` odpadają);
- zwróć wąski obiekt `{ type, text, cost }` - bez przepuszczania
  dodatkowych pól wejścia.
