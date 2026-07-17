## Hint 1

`new URL(rawUrl)` parsuje i waliduje składnię; potem sprawdzasz
`url.protocol` (z dwukropkiem: `"wss:"`).

## Hint 2

Credentials to `url.username || url.password` — URL parsuje je za darmo,
ty masz je tylko odrzucić.

## Hint 3

Deduplikacja z zachowaniem kolejności to `[...new Set(protocols)]`;
allow-listę trzymaj w `Set` i sprawdzaj `some(p => !allowed.has(p))`.
