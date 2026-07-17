# Moduł UTP: współbieczny procesor

## Grupa

UTP

## Kiedy

Gdy worker ma limit prób, wyniki w kolejności i metrykę retry bez wycieku executora.

## Pułapki

Retry całego batcha duplikuje sukcesy; licznik prób musi należeć do elementu, a wyjątek nie może zgubić shutdownu.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
