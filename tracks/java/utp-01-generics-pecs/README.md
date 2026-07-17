# Generyki, PECS i type erasure

## Grupa

UTP

## Kiedy

Gdy API kopiuje subtype’y do kolekcji bazowej i nie wymaga niebezpiecznych castów.

## Pułapki

`List<Dog>` nie jest `List<Animal>`; producer używa extends, consumer super, a typ generyczny znika w runtime.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
