# Lambdy i Stream API

## Grupa

UTP

## Kiedy

Gdy pipeline ma leniwie filtrować, mapować i redukować bez efektów ubocznych.

## Pułapki

Stream jest jednorazowy; efekt w `peek` i mutowalny zewnętrzny akumulator psują równoległość.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
