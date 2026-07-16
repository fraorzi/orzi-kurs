# Zwaliduj FormData tworzenia projektu

Zaimplementuj `parseProjectForm`. `title` musi być stringiem po trimie o długości
3–80. `budget` musi być stringiem reprezentującym skończoną liczbę nieujemną.

Dla sukcesu zwróć `{ ok: true, value }`, a dla błędu `{ ok: false, fieldErrors }`.
Zbierz oba błędy jednocześnie; nie rzucaj i nie używaj rzutowań wejścia.
