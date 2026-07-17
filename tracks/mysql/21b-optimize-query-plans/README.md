# Optymalizacja poprawnych zapytań

## Kiedy

Gdy wynik jest poprawny, ale plan czyta zbyt wiele wierszy, wykonuje podzapytanie per rekord albo koszt rośnie z numerem strony.

## Pułapki

Benchmark bez reprezentatywnych danych kłamie; FORCE INDEX maskuje problem statystyk lub kształtu; optymalizacja musi zachować kontrakt wyniku.

## Źródła

- [MySQL 8.4: EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [MySQL 8.4: Range optimization](https://dev.mysql.com/doc/refman/8.4/en/range-optimization.html)
- [MySQL 8.4: Subquery optimization](https://dev.mysql.com/doc/refman/8.4/en/subquery-optimization.html)
