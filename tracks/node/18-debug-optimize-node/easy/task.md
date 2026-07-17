# [O] Easy — usuń kwadratowe wyszukiwanie

Starter poprawnie deduplikuje rekordy po `id` (pierwszy wygrywa), ale dla
każdego elementu przeszukuje liniowo dotychczasowe wyniki — O(n²).

Kontrakt funkcjonalny (bez zmian):

- zwróć rekordy unikalne po `id`, zachowując pierwszy egzemplarz i kolejność;
- wywołuj `inspect(koszt)` raz na element — bramka jakości sumuje zgłoszone
  koszty.

Bramka `[quality]`: łączny koszt dla 100 elementów ma być liniowy
(≤ 110 jednostek). Zamień liniowe przeszukiwanie na strukturę o stałym
koszcie lookupa.
