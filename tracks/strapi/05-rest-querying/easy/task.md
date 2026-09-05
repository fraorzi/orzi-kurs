# Easy - odczytaj płaską odpowiedź REST v5

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Klient napisany od zera pod Strapi 5 nie ma warstwy `attributes` znanej ze
Strapi v4 - pola wpisu leżą wprost w każdym elemencie `data`. Zaimplementuj
`solve(response)`:

- zwróć `title` każdego elementu `response.data`, w tej samej kolejności;
- nie sięgaj po `item.attributes` - w Strapi 5 ten klucz nie istnieje, więc
  odczyt przez niego zawsze da `undefined`, nie błąd kompilacji;
- pusta tablica `data` daje pustą tablicę wyników.
