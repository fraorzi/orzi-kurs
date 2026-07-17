# Stabilna paginacja

## Kiedy

Gdy lista rośnie, dane zmieniają się między żądaniami, a użytkownik nie może widzieć duplikatów ani pominięć.

## Pułapki

LIMIT bez pełnego ORDER BY jest niedeterministyczny; wysoki OFFSET skanuje i odrzuca; cursor musi zawierać wszystkie pola rozstrzygające remis.

## Źródła

- [MySQL 8.4: LIMIT optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html)
- [MySQL 8.4: ORDER BY optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)
- [MySQL 8.4: Row constructor optimization](https://dev.mysql.com/doc/refman/8.4/en/row-constructor-optimization.html)
