# i18n, bezpieczny XML i JDBC

## Grupa

UTP

## Kiedy

Gdy import XML ma blokować XXE, formatować dane według Locale i generować parametryzowany zapis.

## Pułapki

Parser XML bez secure processing może czytać pliki/URL; konkatenacja SQL prowadzi do injection, a Locale domyślne psuje testy.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
