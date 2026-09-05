# Easy - wybierz aktywnych użytkowników

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Panel administracyjny pokazuje listę kont, na które da się zalogować.
Zapytanie zasila listę bezpośrednio - każdy nadmiarowy wiersz trafia do
UI, a dezaktywowane konto widoczne na liście to zgłoszenie od supportu.

Napisz zapytanie, które:

- zwraca kolumny `id` i `email` - dokładnie te dwie, w tej kolejności,
- obejmuje wyłącznie użytkowników z `active = TRUE`; gdy aktywnych nie
  ma, wynik jest pusty,
- sortuje wynik rosnąco po `id`, niezależnie od kolejności wstawiania
  wierszy do tabeli.

Bez jawnego `ORDER BY` MySQL nie gwarantuje żadnej kolejności - nawet
"po kluczu głównym" to przypadek planu wykonania, nie kontrakt.
