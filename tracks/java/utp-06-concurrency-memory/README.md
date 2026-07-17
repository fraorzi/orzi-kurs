# Wątki, locki i widoczność pamięci

## Grupa

UTP

## Kiedy

Gdy współdzielony licznik musi być atomowy, a snapshot spójny dla wielu wątków.

## Pułapki

`volatile++` nie jest atomowe; synchronizacja na zmiennym obiekcie i różna kolejność locków tworzą race/deadlock.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
