# Medium - zaplanuj publikację lokalizacji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Redaktor wybiera, które wersje językowe dokumentu opublikować jednym
kliknięciem - backend musi ograniczyć żądanie do locale, które faktycznie
istnieją. Zaimplementuj `solve(existing, requested)`:

- `requested === "*"` oznacza "wszystkie istniejące locale" - zwróć `"*"`
  wprost, bez rozwijania do listy (rozwinięciem zajmuje się warstwa niżej,
  bliżej zapisu);
- w przeciwnym razie zwróć podzbiór `requested`, który **istnieje** w
  `existing` - nieznane locale (literówka, usunięta lokalizacja) są ciszej
  pomijane, nie powodują błędu;
- usuń duplikaty i zwróć wynik posortowany alfabetycznie - kolejność
  wejścia nie ma znaczenia dla operacji publikacji.
