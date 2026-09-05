# Zwaliduj FormData tworzenia projektu

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `parseProjectForm`. `title` musi być stringiem po trimie o długości
3-80. `budget` musi być stringiem reprezentującym skończoną liczbę nieujemną.

Dla sukcesu zwróć `{ ok: true, value }`, a dla błędu `{ ok: false, fieldErrors }`.
Zbierz oba błędy jednocześnie; nie rzucaj i nie używaj rzutowań wejścia.
