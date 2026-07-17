# Runtime, typy i bezpieczna arytmetyka

## Grupa

PPJ

## Kiedy

Gdy wynik obliczeń ma poprawnie reagować na przepełnienie i operacje bitowe.

## Pułapki

Rzutowanie nie naprawia wcześniejszego overflow; `int` ma stały zakres, a `Math.addExact` sygnalizuje błąd.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 language specification](https://docs.oracle.com/javase/specs/jls/se25/html/)
