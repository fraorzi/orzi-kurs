# Tytuł dokumentu zgodny z widokiem

Tryb: uzupełnienie. W `starter.tsx` jest punkt wyjścia. Dopisz brakujące zachowanie opisane poniżej.

Zaimplementuj `DocumentTitle`.

Komponent renderuje nagłówek z `title` i synchronizuje `document.title` z tym propsem.
Po zmianie propsa tytuł dokumentu ma się zaktualizować. Po unmountcie komponent ma
przywrócić tytuł, który dokument miał przed rozpoczęciem synchronizacji.

Mutację API przeglądarki wykonaj w efekcie z kompletnymi zależnościami i cleanupem.
