# Zabezpiecz moduł danych przed environment poisoning

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

`CustomerPanel` jest Client Component i importuje moduł serwerowego dostępu do
danych. Nawet jeśli nie wywołuje loadera, import rozszerza błędny module graph.

Usuń zależność klienta od `lib/customer-data.ts`. Oznacz moduł danych przez
`import "server-only"` jako pierwszą instrukcję i pozostaw jego użycie w
`CustomerPage`. Client Component ma znać wyłącznie serializowalne `CustomerSummary`
z neutralnego `types.ts`.

Zachowaj interakcję pokazywania i ukrywania e-maila.
