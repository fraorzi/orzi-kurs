# REST API v5 i jawne zapytania

Strapi 5 spłaszczyło kształt odpowiedzi REST: każdy wpis w `data` niesie
pola wprost (`{ documentId, title, ... }`), bez pośredniej warstwy
`attributes` znanej ze Strapi v4. Kod pisany pod v4 i nieprzepisany na v5
kompiluje się (pola opcjonalne, `any` w odpowiedzi fetch), ale ciszej
zwraca puste wartości — `item.attributes?.title` zawsze jest `undefined`,
bo `attributes` w ogóle nie istnieje.

REST API **nie populates relacji domyślnie** — pole relacyjne bez jawnego
`populate` w zapytaniu w ogóle nie pojawia się w odpowiedzi. `populate=*`
działa, ale ładuje wszystko rekurencyjnie i bywa drogie na dużych
grafach — produkcyjny klient wymienia relacje i pola jawnie (`fields`,
`populate`) zamiast polegać na wildcardzie.

Paginacja REST ma dwa niezależne tryby: **page-based**
(`pagination[page]`, `pagination[pageSize]`) i **offset-based**
(`pagination[start]`, `pagination[limit]`) — nie da się ich mieszać w
jednym zapytaniu. Odpowiedź niesie `meta.pagination` z `page`, `pageSize`,
`pageCount` i `total`; klient, który tej struktury nie waliduje, może
zaakceptować niespójną odpowiedź (np. `page` większy niż `pageCount`) jako
poprawną.

## Kiedy używać

- Budowanie query stringa dla `fields`/`populate`/`sort`/`pagination`
  jawnie, zamiast polegać na domyślnym zachowaniu endpointu.
- Parsowanie odpowiedzi REST v5 w kliencie napisanym od zera pod tę wersję
  (bez warstwy kompatybilności wstecznej z v4).
- Walidacja `meta.pagination` po stronie klienta, zanim wynik trafi do UI
  (np. numeru strony spoza zakresu po zmianie filtrów).

## Kiedy unikać

- Nie zostawiaj `populate=*` jako domyślnego kontraktu współdzielonej
  biblioteki klienta — każdy dodatkowy poziom relacji kosztuje zapytanie do
  bazy po stronie Strapi.
- Nie mieszaj `pagination[page]` z `pagination[start]`/`pagination[limit]`
  w jednym wywołaniu — Strapi honoruje jeden tryb, drugi jest ignorowany
  po cichu.
- Nie parsuj odpowiedzi REST przez typy odziedziczone z v4
  (`attributes`, zagnieżdżone `data.attributes.field`) — to inny kontrakt.

## Pułapki

- `item.attributes?.title` na odpowiedzi v5 nie rzuca błędu — po prostu
  zawsze zwraca `undefined`, bo klucza `attributes` nie ma.
- Relacja bez `populate` w zapytaniu nie pojawia się w odpowiedzi wcale —
  to nie `null`, tylko brak klucza.
- `page` większy niż `pageCount` w `meta.pagination` to sygnał niespójnej
  odpowiedzi (np. dane zmieniły się między zapytaniami) — warto to
  walidować przed paginacją w UI.
- Gdy `total` wynosi 0, `pageCount` też wynosi 0 — to poprawny, nie
  błędny stan (brak wyników), różny od `page` wykraczającego poza istniejące
  strony.

## Źródła (audyt 2026-07-20, Strapi 5)

- [REST API](https://docs.strapi.io/cms/api/rest)
- [REST API — populate & select](https://docs.strapi.io/cms/api/rest/populate-select)
- [REST API — sort & pagination](https://docs.strapi.io/cms/api/rest/sort-pagination)
