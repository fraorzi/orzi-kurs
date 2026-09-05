# Easy - twórz logi strukturalne

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj serializator wpisu logu `solve(input, now)`:

- zwróć **jedną linię** JSON zakończoną `\n` z polami: `timestamp`
  (z wstrzykniętego `now()`), `level`, `message`, opcjonalnie `requestId`
  i płytkie pola z `input.fields`;
- pola o wartości `undefined` mają zniknąć (nie stać się `null` ani
  `"undefined"`);
- wartości pól, których **klucz** zawiera `token`, `secret` lub `password`,
  zastąp `"[REDACTED]"`;
- brak `requestId` = brak klucza w JSON.
