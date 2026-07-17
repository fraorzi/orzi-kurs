# Moduł konsolowy: parser i raport

## Grupa

PPJ

## Kiedy

Gdy surowy plik CSV trzeba zamienić na walidowany model i deterministyczny raport.

## Pułapki

`split(",")` nie obsługuje każdego CSV, ale w jawnie ograniczonym formacie trzeba przynajmniej walidować kolumny, liczby i duplikaty.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 language specification](https://docs.oracle.com/javase/specs/jls/se25/html/)
