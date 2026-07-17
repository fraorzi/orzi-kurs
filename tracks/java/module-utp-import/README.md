# Moduł UTP: import XML do transakcji

## Grupa

UTP

## Kiedy

Gdy pipeline waliduje rekordy, zapisuje batch w transakcji i generuje raport bez częściowego wyniku.

## Pułapki

Walidacja po rozpoczęciu zapisu utrudnia rollback; commit musi nastąpić po całym batchu, a błąd zachować przyczynę.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
