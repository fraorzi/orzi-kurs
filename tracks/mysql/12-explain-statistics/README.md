# EXPLAIN, statystyki i invisible indexes

`EXPLAIN` pokazuje **plan**, jaki optimizer *zamierza* wykonać — szacunkowe
koszty i liczbę wierszy na podstawie statystyk tabeli. `EXPLAIN ANALYZE`
faktycznie **wykonuje** zapytanie i dokłada do planu realne liczby: `actual
time`, rzeczywiste `rows`, `loops`. Różnica ma znaczenie: plan może wyglądać
dobrze na papierze (niski szacowany koszt), a mimo to wykonywać się źle,
jeśli statystyki są nieaktualne albo predykat nie jest sargowalny.
`EXPLAIN FORMAT=JSON` daje to samo co zwykły `EXPLAIN`, ale w strukturze
łatwej do parsowania programowego (`access_type`, `key`,
`rows_examined_per_scan`) — przydatne w automatycznych bramkach jakości, bo
nie zależy od formatowania tekstu.

## Sargowalność

Predykat jest sargowalny (*Search ARGument ABLE*), gdy indeksowana kolumna
stoi samodzielnie po jednej stronie porównania — optimizer może wtedy zejść
w B-tree i wykonać range scan. `WHERE DATE(created_at) = '2025-01-10'`
owija kolumnę w funkcję: MySQL nie potrafi automatycznie odwrócić `DATE(...)`
na przedział `created_at`, więc zamiast range scan dostajesz pełny skan
indeksu (albo tabeli) z filtrowaniem *po* odczycie każdego wiersza. Ten sam
warunek zapisany jako `created_at >= '2025-01-10' AND created_at <
'2025-01-11'` zostawia kolumnę nietkniętą i włącza range scan.

## Histogramy

Histogram (`ANALYZE TABLE ... UPDATE HISTOGRAM ON kolumna WITH N BUCKETS`)
daje optimizerowi rozkład wartości kolumny bez kosztu indeksu na każdym
zapisie — przydatne dla kolumn o niskiej selektywności (mało odrębnych
wartości), które i tak nie kwalifikują się do range scan, ale silnie
nierówny rozkład (`status = 'error'` to 1% wierszy, nie 50%) wpływa na wybór
planu w większych zapytaniach z join. Zwykłe `ANALYZE TABLE` (bez `UPDATE
HISTOGRAM`) odświeża tylko statystyki indeksów/wierszy — nie tworzy, nie
usuwa i nie nadpisuje istniejących histogramów.

## Invisible indexes

`ALTER TABLE ... ADD INDEX ... INVISIBLE` tworzy indeks utrzymywany przy
każdym zapisie, ale niewidoczny dla optimizera w zwykłych zapytaniach —
bezpieczny sposób na przetestowanie kandydata przed publikacją albo
wygaszenie podejrzanego indeksu bez jego usuwania. Żeby ocenić plan z takim
indeksem bez wpływu na resztę ruchu, użyj
`SET_VAR(optimizer_switch='use_invisible_indexes=on')` w hincie `/*+ ... */`
— działa tylko dla jednej instrukcji, nie zmienia globalnego przełącznika.

## Kiedy używać

- `EXPLAIN ANALYZE`, gdy podejrzewasz rozjazd między szacunkiem a
  rzeczywistością (statystyki nieaktualne, dane bardzo nierówne).
- Histogram, gdy kolumna ma niską selektywność, ale silnie nierówny rozkład
  wpływa na plany joinów lub subquery.
- Invisible index przy testowaniu nowego indeksu na produkcji albo przy
  podejrzeniu, że istniejący indeks jest zbędny — zanim go usuniesz na
  stałe.

## Kiedy unikać

- Nie zgaduj planu z samego `EXPLAIN` przy podejrzeniu przestarzałych
  statystyk — uruchom `EXPLAIN ANALYZE` albo najpierw `ANALYZE TABLE`.
- Nie zostawiaj `INVISIBLE` na stałe jako sposób na "cichy" indeks
  produkcyjny — to narzędzie tymczasowe do walidacji, nie docelowy stan.
- Nie licz na histogram tam, gdzie zwykły indeks rozwiąże problem taniej —
  histogram tylko poprawia szacunki, nie przyspiesza samego dostępu do
  wierszy.

## Pułapki

- `EXPLAIN` bez `ANALYZE` nigdy nie wykonuje zapytania — dla zapytań ze
  skutkami ubocznymi (subquery z side effect, `INSERT ... SELECT`) to
  jedyny bezpieczny wybór do inspekcji planu.
- Funkcja na indeksowanej kolumnie (`DATE()`, `YEAR()`, niejawny CAST przy
  porównaniu typów) unieważnia sargowalność, nawet jeśli indeks istnieje.
- Invisible index nadal wymusza `UNIQUE` i nadal jest aktualizowany przy
  każdym zapisie — "niewidoczny" dotyczy tylko optimizera, nie kosztu
  operacyjnego. Zwykłe `ANALYZE TABLE` nie zarządza histogramami — nie
  usuwa starego i nie tworzy nowego bez jawnego `UPDATE HISTOGRAM`.
- Plan bywa inny na małej tabeli testowej niż na produkcyjnej — porównuj
  `access_type`/`key`/obecność `filesort`, nie same liczby wierszy.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [EXPLAIN Statement](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [EXPLAIN ANALYZE](https://dev.mysql.com/doc/refman/8.4/en/explain-with-explain-analyze.html)
- [ANALYZE TABLE Statement](https://dev.mysql.com/doc/refman/8.4/en/analyze-table.html)
- [Optimizer Histogram Statistics](https://dev.mysql.com/doc/refman/8.4/en/optimizer-statistics.html)
- [Invisible Indexes](https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html)
