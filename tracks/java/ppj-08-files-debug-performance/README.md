# Pliki, debugowanie i wydajność

## Grupa

PPJ

## Kiedy

Gdy raport z dużego pliku ma być czytany strumieniowo, bez wycieku uchwytu i konkatenacji kwadratowej.

## Pułapki

`Files.readAllLines` skaluje pamięć z plikiem, a brak try-with-resources zostawia zasób otwarty po wyjątku.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 language specification](https://docs.oracle.com/javase/specs/jls/se25/html/)
