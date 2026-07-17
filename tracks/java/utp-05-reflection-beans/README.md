# Refleksja, adnotacje i JavaBeans

## Grupa

UTP

## Kiedy

Gdy komponent odkrywa oznaczone metody i emituje PropertyChange bez otwierania prywatnych pól.

## Pułapki

`setAccessible(true)` omija enkapsulację; refleksja w hot path jest kosztowna, a listener bez remove może wyciekać.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
