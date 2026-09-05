# Hard [O] - regresja, obsługa interfejsu i wydajność zastanego widoku

Tryb: optymalizacja. Popraw istniejący kod w `starter.ts`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Widok listy (`buildRows`) łączy `items` z ich właścicielami (`users`).
Zgłoszenie supportu: po sortowaniu listy w UI znikają zaznaczenia
(React remountuje wiersze), czytnik ekranu czyta każdy przycisk jako samo
"Edytuj" bez kontekstu, a widok klienta z tysiącami pozycji zawiesza
przeglądarkę przy każdym odświeżeniu.

## Wymagania

- `key` wiersza to `item.id`, nie pozycja w tablicy - reorder nie może
  gubić stanu UI powiązanego z wierszem.
- `actionLabel` jednoznacznie identyfikuje wiersz dla czytnika ekranu
  (zawiera tytuł pozycji), nie tylko nazwę akcji.
- Dopasowanie właściciela nie może skanować `users` liniowo dla każdego
  elementu `items` - zbuduj indeks raz.

## Przypadki brzegowe i akceptacja

- `ownerId` bez odpowiadającego `user` daje czytelną wartość zastępczą,
  nie `undefined`; pusta lista `items` zwraca `[]` bez błędu.
- Testy zachowania (identity, obsługa interfejsu, fallback, pusta lista) są zielone, a
  `[quality]` wykazuje brak liniowego skanowania - licznikiem, nie czasem.
