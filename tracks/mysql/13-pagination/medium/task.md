# Medium — zamień OFFSET na cursor keyset

Strona 500 przez `OFFSET` oznacza, że silnik musi odczytać i odrzucić 500
wcześniejszych wierszy, zanim zwróci właściwe 20 — koszt rośnie liniowo z
głębokością strony. Keyset pagination zamienia "odrzuć N wierszy" na
"wskaż, gdzie skończyła się poprzednia strona": klient przesyła ostatni
widziany `(created_at, id)`, a zapytanie filtruje bezpośrednio od tego
punktu, bez dotykania odrzuconych wierszy.

## Wymagania

- Kursor wskazuje `(2026-01-02 10:00:00, id=5)` — ostatni wiersz poprzedniej
  strony. Zwróć maksymalnie trzy kolejne rekordy malejąco.
- Warunek `(created_at, id) < (kursor_created_at, kursor_id)` musi być
  porównaniem krotki (`ROW`), nie dwóch niezależnych warunków — samo
  `created_at < kursor_created_at` gubi wiersze, które dzielą znacznik
  czasu z kursorem, ale mają mniejsze `id`.
- Wiersz samego kursora (dokładnie ten sam `created_at` i `id`) nigdy nie
  wraca w wyniku — porównanie jest ostre (`<`), nie `<=`.
- `ORDER BY` musi być identyczny jak warunek kursora (`created_at DESC, id
  DESC`), inaczej kolejne strony przestają się ze sobą składać.
