# Easy - ponumeruj zamówienia klienta

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Panel obsługi klienta oznacza najnowsze zamówienie etykietą "position 1",
żeby agent widział od razu, które zgłoszenie jest najświeższe. Numeracja
globalna zamiast per-klient pomyliłaby agentów: numer zależałby od tego,
ilu innych klientów złożyło zamówienie wcześniej, nie od historii tego
konkretnego klienta.

Napisz zapytanie, które:

- zwraca kolumny `id`, `customer_id`, `position` - dokładnie te trzy,
- numeruje zamówienia od 1 osobno dla każdego `customer_id` - licznik
  resetuje się przy zmianie klienta,
- w obrębie klienta numeruje od najnowszego do najstarszego
  (`created_at DESC`),
- przy dwóch zamówieniach tego samego klienta z identycznym `created_at`
  rozstrzyga remis malejąco po `id`, żeby numeracja była deterministyczna,
- sortuje wynik po `customer_id, position` rosnąco - to kolejność
  wynikowa zapytania, niezależna od `ORDER BY` wewnątrz `OVER`.

`ORDER BY` wewnątrz `OVER` ustala tylko kolejność liczenia okna, nie
kolejność wierszy w wyniku - te dwie role rozdziela osobny `ORDER BY` na
końcu zapytania.
