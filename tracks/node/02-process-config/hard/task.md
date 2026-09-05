# Hard - redaguj diagnostykę procesu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Endpoint diagnostyczny ma pokazywać konfigurację procesu bez wycieku sekretów.
Zaimplementuj `solve(env)`:

- pomiń wpisy o wartości `undefined`;
- wartości kluczy zawierających `token`, `secret`, `password` lub `key`
  (bez rozróżniania wielkości liter) zastąp stringiem `"[REDACTED]"`;
- pozostałe wartości przepisz bez zmian;
- zwróć zwykły obiekt `Record<string, string>` - snapshot, nie referencję do
  oryginalnego env.

To samo podejście stosuj przy logowaniu configu i raportach błędów: redakcja po
nazwie klucza łapie wycieki zanim trafią do systemu logów.
