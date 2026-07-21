# Podzapytania, CTE i zbiory

Trzy narzędzia, jeden wspólny mianownik: wyrażają logikę zapytania bez
przenoszenia jej do aplikacji. Różnica jest w tym, co dokładnie
gwarantują i czego nie.

- **EXISTS zamiast JOIN do testu istnienia.** "Czy klient ma choć
  jedno opłacone zamówienie" to pytanie o istnienie, nie o liczbę.
  `JOIN customers ... orders WHERE status = 'paid'` odpowiada na inne
  pytanie — zwraca po jednym wierszu na każde pasujące zamówienie,
  więc klient z trzema opłaconymi zamówieniami pojawi się trzy razy.
  `EXISTS (podzapytanie skorelowane kluczem klienta)` sprawdza samą
  obecność wiersza i nigdy nie zwielokrotnia zewnętrznego wyniku.
- **CTE jako nazwane etapy, nie jako optymalizacja.** `WITH revenue AS
  (...), average_revenue AS (...) SELECT ...` dzieli raport na kroki,
  które czyta się z góry na dół: najpierw przychód per klient, potem
  średnia z tych przychodów, na końcu filtr. Zaszyty na stałe próg
  (`> 70`) może przypadkiem pasować do jednego zestawu danych i
  cichnie rozjechać się z każdym kolejnym.
- **UNION ALL w rekurencyjnym CTE.** `WITH RECURSIVE` ma część
  kotwiczącą (korzeń drzewa) i część rekurencyjną, która dokłada
  kolejne pokolenia, aż nie znajdzie już nowych wierszy. `UNION ALL`
  zachowuje każdy osiągnięty węzeł bez próby deduplikacji — w drzewie
  bez cykli węzły i tak się nie powtarzają, a deduplikacja tylko
  kosztuje.

## Kiedy używać

- `EXISTS`/`NOT EXISTS` do pytań "czy istnieje relacja" — subskrypcja,
  uprawnienie, choć jedno powiązane zamówienie — zamiast `JOIN` plus
  `DISTINCT` jako łatka na zwielokrotnienie.
- Nazwane CTE, gdy raport ma więcej niż jeden logiczny etap
  przetwarzania — czytelniejsze niż zagnieżdżone podzapytania w
  `FROM`, bo każdy etap ma nazwę i widać kolejność.
- `WITH RECURSIVE` do struktur drzewiastych i grafowych o nieznanej z
  góry głębokości — kategorie, hierarchia organizacyjna, graf
  zależności — zamiast rekurencji po stronie aplikacji z wieloma
  zapytaniami w pętli.

## Kiedy unikać

- Nie licz elementów przez `JOIN` + `COUNT(DISTINCT ...)`, gdy pytanie
  brzmi tylko "czy istnieje" — `EXISTS` kończy przeszukiwanie na
  pierwszym dopasowaniu i nie wymaga porządkowania duplikatów.
- Nie traktuj CTE jako gwarancji materializacji ani "tymczasowej
  tabeli w pamięci" — optimizer może scalić (inline) definicję CTE z
  zapytaniem zewnętrznym tak samo, jak zwykłe podzapytanie w `FROM`.
- Nie zaszywaj progu raportu jako stałej liczby, gdy w rzeczywistości
  liczysz go z danych (średnia, mediana, percentyl) — stała działa do
  pierwszej zmiany skali danych.

## Pułapki

- `JOIN` do testu istnienia zwielokrotnia wiersz zewnętrzny o liczbę
  pasujących wierszy wewnętrznych — łatwo przeoczyć na małych danych
  testowych, gdzie każdy klient ma co najwyżej jedno pasujące
  zamówienie.
- `UNION` (bez `ALL`) usuwa duplikaty przez porównanie całych wierszy —
  to koszt sortowania/haszowania, którego `UNION ALL` nie ponosi;
  używaj `UNION` tylko, gdy duplikaty naprawdę nie powinny wystąpić w
  wyniku.
- Rekurencyjne CTE mają domyślny limit głębokości
  (`cte_max_recursion_depth`) — źle złożony warunek rekurencyjny (np.
  cykl w danych) kończy się błędem przekroczenia limitu, nie
  nieskończoną pętlą serwera.
- Średnia licząca się z niewłaściwego poziomu agregacji (z pojedynczych
  zamówień zamiast z przychodów per klient) daje inną wartość niż
  "średnia z tego, o czym mówi raport" — klient z wieloma małymi
  zamówieniami zaniża lub zawyża wynik nieproporcjonalnie do swojej
  wagi w segmencie.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Subqueries](https://dev.mysql.com/doc/refman/8.4/en/subqueries.html)
- [Subqueries with EXISTS or NOT EXISTS](https://dev.mysql.com/doc/refman/8.4/en/exists-and-not-exists-subqueries.html)
- [WITH (Common Table Expressions)](https://dev.mysql.com/doc/refman/8.4/en/with.html)
- [UNION Clause](https://dev.mysql.com/doc/refman/8.4/en/union.html)
