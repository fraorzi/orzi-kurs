# Easy - waliduj payload publikacji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Body żądania to zawsze `unknown` w runtime - TypeScript sprawdza typy
tylko w czasie kompilacji, więc kontroler musi sam zweryfikować kształt
danych, zanim cokolwiek z nimi zrobi. Zaimplementuj `solve(input)`,
walidator payloadu publikacji artykułu.

Wymagania:

- gdy `input` nie jest obiektem (albo jest `null`), rzuć `Error`
  zawierający słowo `body`;
- `title` musi być stringiem, który po `trim()` ma **co najmniej 3 znaki**
  - w przeciwnym razie rzuć `Error` zawierający słowo `title`;
- `locale` musi pasować do `/^[a-z]{2}$/` (dwuliterowy kod, małe litery)
  - inaczej rzuć `Error` zawierający słowo `locale`;
- kolejność sprawdzeń ma znaczenie: najpierw kształt obiektu, potem
  `title`, na końcu `locale` - pierwszy napotkany błąd przerywa walidację;
- w happy path zwróć **oczyszczony** obiekt: `title` po `trim()`, `locale`
  bez zmian.
