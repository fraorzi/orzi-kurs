# Usuń nieserializowalny callback z granicy RSC

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

`ProductGrid` przekazuje do Client Component funkcję `compareProducts`. Taki zwykły
callback nie jest serializowalnym propsem Server → Client, mimo że unit test DOM
może wyglądać poprawnie.

Przenieś wybór komparatora do `SortControls`. Serwer ma przekazywać wyłącznie
tablicę zwykłych obiektów `Product`. Zachowaj sortowanie po nazwie i cenie bez
mutowania wejściowych propsów.
