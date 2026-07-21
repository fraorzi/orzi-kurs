# Typy danych, czas, tekst i JSON

Wybór typu kolumny to decyzja o tym, jakie błędy silnik wykryje za
darmo, a jakie przepuści po cichu. Trzy przykłady z tego tematu:

- **Pieniądze przez DOUBLE.** `quantity * CAST(unit_price AS DOUBLE)`
  wygląda niewinnie dla jednej pozycji faktury, ale binarna
  reprezentacja ułamków dziesiętnych (0.10, 0.20…) nie jest dokładna —
  suma wielu drobnych kwot odjeżdża o kilkanaście miejsc po przecinku
  (`0.30000000000000004` zamiast `0.30`). DECIMAL trzyma cyfry
  dziesiętnie, bez tej straty; DOUBLE nie nadaje się do niczego, co
  ktoś kiedyś porówna co do grosza.
- **Koniec dnia przez BETWEEN.** `BETWEEN '2026-05-01' AND '2026-05-01
  23:59:59'` to domknięty przedział — górna granica bez części
  ułamkowej odcina zdarzenia z niezerowymi mikrosekundami dokładnie w
  tej sekundzie. Półotwarty zakres `[start, nextDay)` nie wymaga
  zgadywania precyzji końca okresu i składa się bez dziur między
  kolejnymi dniami.
- **JSON jako nieufny DTO.** Dokument JSON nie ma wymuszonego przez
  bazę schematu — klucz może nie istnieć, być liczbą, obiektem albo
  literałem `null`. Operator `->` zwraca JSON (string w cudzysłowach),
  `->>` zwraca czysty tekst; żaden z nich nie sprawdza typu. Bez
  `JSON_TYPE` zapytanie po cichu przepuszcza dane niepasujące do
  oczekiwanego kształtu zamiast je odrzucić.

## Kiedy używać

- DECIMAL(p,s) dla każdej wartości pieniężnej, ilości magazynowej albo
  czegokolwiek, co ktoś kiedyś zsumuje i porówna z inną sumą.
- Półotwarty zakres `[start, end)` do filtrowania po okresach — dniach,
  miesiącach, oknach czasowych — zamiast `BETWEEN` z domkniętą górną
  granicą.
- `JSON_TYPE` przed odczytem wartości z dokumentu, którego kształt nie
  jest kontraktem bazy — import z zewnętrznego API, ustawienia
  użytkownika, dane historyczne z różnych wersji schematu.

## Kiedy unikać

- Nie rzutuj wartości pieniężnych na FLOAT/DOUBLE nawet "tylko do
  wyświetlenia" — błąd raz wprowadzony do obliczenia zostaje w danych
  pochodnych (raporty, eksporty, kolejne agregacje).
- Nie zgaduj granicy okresu literałem w rodzaju `23:59:59.999999` —
  precyzja kolumny może się zmienić (`DATETIME` → `DATETIME(6)`), a
  literał zostanie za oknem albo w nim, zależnie od przypadku.
- Nie traktuj JSON jako zamiennika kolumn relacyjnych z constraints —
  brak walidacji na wejściu oznacza, że każde zapytanie odczytujące
  dokument musi samo bronić się przed nieoczekiwanym kształtem.

## Pułapki

- `CAST(x AS DOUBLE)` w środku wyrażenia sumowanego działa "prawie
  zawsze dobrze" na małych zbiorach testowych — błąd ujawnia się przy
  wielu wierszach albo konkretnych wartościach ułamkowych, nie przy
  każdym uruchomieniu.
- `BETWEEN` jest symetrycznie domknięty z obu stron — dla zakresów
  czasu to prawie zawsze zła semantyka, bo granica dnia/miesiąca
  powinna być wyłączna po jednej stronie.
- `JSON_TYPE` zwraca SQL `NULL`, gdy ścieżka nie istnieje w dokumencie,
  ale zwraca string `'NULL'`, gdy wartością jest literał JSON `null` —
  to dwa różne przypadki, które trzeba odrzucić z różnych powodów.
- Operator `->` na wartości tekstowej zwraca ją w cudzysłowach JSON —
  porównanie czy konkatenacja tego wyniku z resztą tekstu bez `->>`
  wprowadza ukryte cudzysłowy do danych wyjściowych.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [The DECIMAL and NUMERIC Types](https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html)
- [The DATE, DATETIME, and TIMESTAMP Types](https://dev.mysql.com/doc/refman/8.4/en/datetime.html)
- [Unicode Support](https://dev.mysql.com/doc/refman/8.4/en/charset-unicode.html)
- [JSON Function Reference](https://dev.mysql.com/doc/refman/8.4/en/json-function-reference.html)
- [Functions That Return JSON Value Attributes](https://dev.mysql.com/doc/refman/8.4/en/json-attribute-functions.html)
