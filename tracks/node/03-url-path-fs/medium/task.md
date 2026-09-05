# Medium - zatrzymaj path traversal

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Serwis zapisuje pliki użytkowników pod `root`. Nazwa pliku przychodzi
z requestu, więc bywa złośliwa. Zaimplementuj `solve(root, input)`:

- zwróć bezwzględną, znormalizowaną ścieżkę kandydata, jeżeli leży w `root`
  (lub jest samym `root`);
- rzuć `Error` dla ucieczki przez `..`, dla ścieżki absolutnej poza rootem
  i dla rodzeństwa o zbieżnym prefiksie (`/data-evil` przy root `/data`);
- porównanie wykonaj **po** `path.resolve` - nigdy na surowym stringu.

To standardowa bramka przed każdym `readFile`/`writeFile` na nazwie
pochodzącej z zewnątrz.
