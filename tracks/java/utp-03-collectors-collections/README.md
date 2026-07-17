# Collectors i dobór kolekcji

## Grupa

UTP

## Kiedy

Gdy raport grupuje rekordy, zachowuje stabilny porządek i liczy downstream sumy bez ręcznego mutowania map.

## Pułapki

Domyślny `toMap` rzuca przy duplikacie; HashMap nie gwarantuje kolejności, a zły collector łamie associativity.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
