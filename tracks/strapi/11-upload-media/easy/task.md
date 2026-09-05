# Easy - zweryfikuj metadane uploadu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Media Library w Strapi 5 waliduje pliki po **rzeczywistym** MIME, nie po
rozszerzeniu - a deklarowany `Content-Type` to wciąż tylko to, co wysłał
klient. Zanim plik trafi do dalszego przetwarzania, metadane muszą
przejść przez allow-list i limit rozmiaru.

Zaimplementuj `solve(file)`, gdzie `file` ma `mime` i `size` (w bajtach):

- dopuść wyłącznie `image/jpeg`, `image/png`, `image/webp` - wszystko
  inne (w tym `image/svg+xml`, które bywa wektorem ataku XSS) odrzuć;
- `size` musi być liczbą całkowitą **większą od zera** - `0`, ujemne
  i niecałkowite wartości (np. `1024.5`) są nieprawidłowe;
- limit rozmiaru to dokładnie 5 MiB (`5 * 1024 * 1024` bajtów),
  **włącznie** - plik o rozmiarze równym limitowi jest akceptowany,
  większy o choćby 1 bajt - nie;
- zwróć `boolean`, bez rzucania błędów - to warstwa walidacji, nie
  efektu ubocznego.
