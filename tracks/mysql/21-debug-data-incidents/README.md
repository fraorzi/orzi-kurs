# Debugowanie incydentów danych

Trzy klasy incydentów, które łączy jedno: kod **wykonuje się bez błędu**
i zwraca wynik, który wygląda wiarygodnie — dopiero porównanie
z oczekiwanym kontraktem (albo produkcyjna reklamacja) pokazuje, że coś
jest nie tak. Naprawa objawu bez zrozumienia przyczyny tworzy regresję:
zmiana, która naprawia jeden zgłoszony przypadek, zostawia (albo tworzy)
inny.

**`WHERE` po `LEFT JOIN` potrafi po cichu zamienić go w `INNER JOIN`.**
`LEFT JOIN orders o ON o.customer_id = c.id WHERE o.status = 'paid'`
wygląda jak filtr na zamówieniach, ale logicznie wykonuje się **po**
złączeniu: wiersze klientów bez pasujących zamówień dostają
`NULL`-extended `o.*`, a `o.status = 'paid'` dla `NULL` daje `UNKNOWN`
— `WHERE` je odrzuca. Efekt: klienci bez płatnych zamówień znikają
z raportu zamiast pokazać `0`. Warunek dotyczący **opcjonalnej** relacji
należy do `ON`, nie do `WHERE`; `WHERE` zostaje dla filtrów na tabeli
głównej.

**Read-modify-write to wyścig, nawet gdy każda linia kodu jest
poprawna.** `SELECT value ...` do zmiennej, potem `UPDATE ... SET value =
@zmienna + 1` to dwie osobne instrukcje — między nimi druga sesja może
zdążyć zrobić to samo, odczytując tę samą starą wartość. Efekt: dwie
równoległe inkrementacje dają wynik `+1`, nie `+2` — jedna z aktualizacji
"gubi się", mimo że obie zakończyły się sukcesem bez błędu. Pojedyncza
atomowa instrukcja (`UPDATE counters SET value = value + 1 WHERE id = ?`)
usuwa okno wyścigu całkowicie: `value + 1` liczy się pod blokadą wiersza,
na aktualnym stanie, w jednym kroku.

**Migracja na danych legacy musi liczyć się z tym, że dane są brudne.**
Dodanie `UNIQUE` na kolumnie, w której już istnieją duplikaty (po
normalizacji: różna wielkość liter, białe znaki), oblewa dopiero na
etapie budowy indeksu — długo po tym, jak dane trafiły do tabeli. Naprawa
wymaga jawnej decyzji "który rekord jest kanoniczny" (zwykle najmniejsze
`id` — najstarszy wpis) **przed** dodaniem ograniczenia, nie próby dodania
ograniczenia i reagowania na błąd.

## Kiedy używać

- Regresji odtwarzającej dokładny raportowany przypadek (dane wejściowe,
  oczekiwany wynik) jako pierwszego kroku — naprawa bez reprodukcji to
  zgadywanie, które łatwo naprawi objaw gdzie indziej.
- `EXPLAIN`/`EXPLAIN ANALYZE` do potwierdzenia, że `WHERE` faktycznie
  filtruje przed czy po złączeniu — nie zgaduj z samego tekstu zapytania.
- Atomowej instrukcji (`UPDATE ... SET col = col + delta`) zawsze, gdy
  nowa wartość zależy tylko od starej wartości w tym samym wierszu —
  read-modify-write jest potrzebny wyłącznie, gdy logika jest zbyt
  złożona na jedno wyrażenie SQL.

## Kiedy unikać

- Nie naprawiaj `WHERE` dopisując `OR o.status IS NULL` jako łatkę —
  to nie przywraca semantyki `LEFT JOIN`, tylko dokleja specjalny
  przypadek, który złamie się przy kolejnym filtrze.
- Nie synchronizuj read-modify-write przez blokadę na poziomie aplikacji
  (mutex w procesie), gdy w grę wchodzi wiele instancji/procesów — blokada
  aplikacyjna nie obejmuje innych procesów; atomowa instrukcja SQL działa
  niezależnie od tego, ile procesów łączy się z bazą.
- Nie dodawaj `UNIQUE` na danych legacy bez wcześniejszego audytu
  duplikatów (`GROUP BY ... HAVING COUNT(*) > 1` na znormalizowanej
  wartości) — migracja, która oblewa w produkcji w połowie wykonania,
  zostawia schemat w stanie pośrednim.

## Pułapki

- `WHERE` na kolumnie z **prawej** strony `LEFT JOIN` (poza `IS NULL`)
  cicho zamienia go w `INNER JOIN` — bez błędu, bez ostrzeżenia, po
  prostu inny wynik niż zamierzony.
- Read-modify-write "działa" na każdym pojedynczym teście sekwencyjnym —
  wyścig ujawnia się tylko pod równoległym obciążeniem, więc bug
  przechodzi code review i testy jednostkowe bez zarzutu.
- `DELETE` w self-joinie do usuwania duplikatów bez jawnego kryterium
  "który rekord zostaje" (np. `duplicate.id > canonical.id`) może usunąć
  losowy rekord z grupy zamiast tego, który aplikacja zakłada jako
  kanoniczny.
- DDL (`ALTER TABLE ... ADD UNIQUE`) nie cofa się przez `ROLLBACK` —
  migracja, która częściowo się powiedzie, zostawia trwałą zmianę
  schematu, nie coś, co można po prostu wycofać.
- Naprawa "działa u mnie" na próbce bez duplikatów/bez równoległości nie
  dowodzi niczego — incydenty tej klasy ujawniają się dopiero na
  reprezentatywnych danych albo pod realnym obciążeniem współbieżnym.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [JOIN Clause / Nested Join Optimization](https://dev.mysql.com/doc/refman/8.4/en/nested-join-optimization.html)
- [Outer Join Simplification](https://dev.mysql.com/doc/refman/8.4/en/outer-join-simplification.html)
- [InnoDB Locking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)
- [InnoDB and FOREIGN KEY / UNIQUE Constraints](https://dev.mysql.com/doc/refman/8.4/en/constraint-unique.html)
- [ALTER TABLE Statement](https://dev.mysql.com/doc/refman/8.4/en/alter-table.html)
- [DELETE Statement (multi-table)](https://dev.mysql.com/doc/refman/8.4/en/delete.html)
