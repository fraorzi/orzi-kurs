# Sesja wymagająca providera

Zaimplementuj `SessionProvider`, `useSession` i `AccountButton`.

Context ma default `null`. `SessionProvider` udostępnia obiekt użytkownika przez
składnię React 19. `useSession` zwraca sesję, ale poza providerem rzuca błąd
`useSession wymaga SessionProvider`.

`AccountButton` używa wyłącznie custom hooka i renderuje przycisk
`Konto: {displayName}`. Nie używaj fikcyjnego użytkownika jako fallbacku.
