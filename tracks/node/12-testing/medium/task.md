# Medium — izoluj fixture katalogu

Testy piszące na dysk nie mogą się widzieć nawzajem ani zostawiać śmieci.
Zaimplementuj `solve(run)`:

- utwórz unikalny katalog przez `mkdtemp` w `os.tmpdir()`;
- przekaż ścieżkę do `run(directory)` i zwróć jego wynik;
- usuń katalog rekursywnie w `finally` — także wtedy, gdy `run` rzuci;
- kolejne wywołania dostają **różne** katalogi.
