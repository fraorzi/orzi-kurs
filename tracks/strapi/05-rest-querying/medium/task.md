# Medium - zbuduj ograniczone query REST

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Klient publicznej listy artykułów nie ufa domyślnemu zachowaniu endpointu
- wymienia jawnie, czego potrzebuje. Zaimplementuj `solve(locale, page)`,
zwracający query string (bez wiodącego `?`):

- `fields[0]=title`, `fields[1]=slug` - tylko te dwa pola, nic więcej;
- `locale=<locale>` i `status=published` - publiczny odczyt nigdy nie
  pyta o draft;
- `sort[0]=publishedAt:desc` - najnowsze najpierw;
- `pagination[page]=<page>`, `pagination[pageSize]=20` - stały rozmiar
  strony, tryb page-based (nie mieszaj z `pagination[start]`/`[limit]`);
- `page` musi być całkowitą liczbą ≥ 1 - inna wartość rzuca błąd
  wspominający stronę.
