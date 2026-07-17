# java.io, NIO.2 i bezpieczna serializacja

## Grupa

UTP

## Kiedy

Gdy katalog trzeba przejść strumieniowo, filtrować Path i zapisać przenośny format tekstowy zamiast kruchego Object stream.

## Pułapki

Domyślna serializacja Java wiąże format z klasą i bywa niebezpieczna dla niezaufanych danych; Files.walk wymaga zamknięcia.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
