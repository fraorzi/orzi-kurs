## Hint 1

Dwie gałęzie: `if (!error)` buduje pomoc (template literal z sekcjami),
reszta formatuje błąd.

## Hint 2

Komunikat czytaj bezpiecznie: `error instanceof Error ? error.message :
"Unknown error"` — do terminala nie trafia nic z cudzych struktur.

## Hint 3

`cause` doklejaj tylko przy `debug && error instanceof Error && error.cause`
— w trybie normalnym szczegóły wewnętrzne zostają w logach, nie na ekranie.
