# String, StringBuilder i Unicode

## Grupa

PPJ

## Kiedy

Gdy tekst może zawierać emoji i trzeba pracować na code pointach, a nie pojedynczych `char`.

## Pułapki

`char` jest jednostką UTF-16, nie zawsze znakiem; `==` porównuje referencje String, a konkatenacja w pętli tworzy kopie.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 language specification](https://docs.oracle.com/javase/specs/jls/se25/html/)
