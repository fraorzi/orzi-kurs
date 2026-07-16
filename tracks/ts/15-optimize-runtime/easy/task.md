# Easy [O] — indeks produktów bez zmiany typów

`enrichOrderLines` dokleja do każdej pozycji zamówienia produkt o pasującym ID albo
`null`. Kod jest kompletny i poprawny, ale dla każdej pozycji skanuje całą listę
produktów przez `find`, czyli w najgorszym przypadku działa w O(n·m).

Zbuduj indeks produktów raz i zachowaj dokładnie ten sam publiczny kontrakt:

- wejścia pozostają `readonly`,
- wynik ma typ `EnrichedLine[]`,
- kolejność pozycji się nie zmienia,
- brak produktu nadal daje `null`,
- nie mutuj wejściowych obiektów ani tablic.

Test `[quality]` liczy odczyty `product.id`. Docelowo każdy produkt powinien zostać
odczytany przy budowaniu indeksu tylko raz.
