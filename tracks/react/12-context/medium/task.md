# Sesja wymagająca providera

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SessionProvider`, `useSession` i `AccountButton`.

Context ma default `null`. `SessionProvider` udostępnia obiekt użytkownika przez
składnię React 19. `useSession` zwraca sesję, ale poza providerem rzuca błąd
`useSession wymaga SessionProvider`.

`AccountButton` używa wyłącznie custom hooka i renderuje przycisk
`Konto: {displayName}`. Nie używaj fikcyjnego użytkownika jako fallbacku.
