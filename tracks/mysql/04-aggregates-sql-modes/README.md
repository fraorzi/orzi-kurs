# Agregacje i ONLY_FULL_GROUP_BY

`GROUP BY` dzieli wiersze na grupy, ale to, co wolno umieścić w
`SELECT` obok kolumn grupujących, nie jest kwestią stylu — to
kontrakt, który MySQL 8.4 egzekwuje domyślnie włączonym
`ONLY_FULL_GROUP_BY`. Trzy przykłady z tego tematu:

- **Surowa kolumna obok agregatu.** `SELECT status, COUNT(*), total
  FROM orders GROUP BY status` wygląda niewinnie, dopóki nie zapytasz:
  "które `total` z grupy?". MySQL nie zgaduje — odrzuca zapytanie
  błędem 1055, zanim zwróci choćby jeden wiersz, bo `total` nie jest
  ani zagregowane, ani funkcyjnie zależne od `status`.
- **Agregat w WHERE.** `WHERE status = 'paid' AND SUM(total) >= 100`
  próbuje filtrować po wyniku, którego jeszcze nie ma — `WHERE`
  działa na pojedynczych wierszach, przed grupowaniem. Filtr po
  agregacie należy do `HAVING`, które widzi już gotowe grupy.
- **MAX nie wybiera wiersza.** `MAX(recorded_at)` obok surowej
  kolumny `value` w tej samej grupie to ten sam błąd co pierwszy
  przykład — `MAX` daje jedną wartość, nie cały rekord. Żeby dostać
  `value` z wiersza o najnowszym `recorded_at`, trzeba policzyć klucz
  rekordu w podzapytaniu i złączyć go z powrotem do tabeli źródłowej.

## Kiedy używać

- `GROUP BY` do raportów per grupa: liczba i suma per status, przychód
  per klient, ostatni odczyt per urządzenie.
- `HAVING`, gdy warunek dotyczy wyniku agregatu (suma, liczba,
  średnia) — próg przychodu, liczba zdarzeń powyżej limitu.
- Wzorzec "policz klucz w podzapytaniu, złącz z powrotem", gdy
  potrzebujesz całego wiersza odpowiadającego wartości agregatu
  (`MAX`/`MIN`), nie samej wartości.

## Kiedy unikać

- Nie dokładaj surowej kolumny do `SELECT` z `GROUP BY` "bo działała
  na starszej bazie" — `ONLY_FULL_GROUP_BY` w MySQL 8.4 jest domyślnie
  włączone i egzekwuje funkcyjną zależność, nawet jeśli w danych
  testowych wynik akurat wyglądałby sensownie.
- Nie próbuj filtrować po agregacie w `WHERE` — MySQL odrzuci to
  błędem 1111 (`Invalid use of group function`), niezależnie od tego,
  czy warunek "wygląda logicznie".
- Nie zakładaj, że wzorzec `MAX` + złączenie zwrotne obsłuży dokładny
  remis (dwa wiersze tej samej grupy z identyczną wartością `MAX`) —
  da wtedy więcej niż jeden wiersz na grupę; rozstrzyganie remisów to
  domena window functions (temat 06).

## Pułapki

- `COUNT(*)` liczy wszystkie wiersze grupy, `COUNT(column)` pomija
  wiersze z `NULL` w tej kolumnie — dla tabeli z brakującymi
  wartościami te dwie liczby się rozjeżdżają.
- Kolumna funkcyjnie zależna od `GROUP BY` (np. nazwa klienta przy
  grupowaniu po jego kluczu głównym) jest legalna bez agregacji —
  MySQL sprawdza zależność funkcyjną, nie tylko obecność w `GROUP BY`.
- `HAVING` bez `GROUP BY` nadal działa — filtruje pojedynczą grupę,
  jaką jest cała tabela — ale to rzadko intencja, którą ktoś czytający
  zapytanie odgadnie.
- Pusta tabela wejściowa do zapytania z `GROUP BY` daje zero wierszy
  wyniku (brak grup), a nie jeden wiersz z zerami — to inne zachowanie
  niż `SUM`/`COUNT` bez `GROUP BY`, które zawsze zwracają dokładnie
  jeden wiersz.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Aggregate Function Descriptions](https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html)
- [MySQL Handling of GROUP BY](https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html)
