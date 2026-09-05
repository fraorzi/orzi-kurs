# Easy - generuj token o zadanej entropii

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Tokeny resetu hasła muszą być niezgadywalne. Zaimplementuj `solve(bytes)`:

- wygeneruj `bytes` bajtów z CSPRNG (`crypto.randomBytes`);
- zwróć je w formacie `base64url` - bezpiecznym dla URL-i (bez `+`, `/`, `=`);
- `bytes` musi być liczbą całkowitą ≥ 16 - mniejsza entropia to `Error`,
  bo 8-bajtowy token da się brutforsować.
