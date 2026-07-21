## Hint 1

Licznik `number++` inkrementuj dla **każdego** wiersza, zanim zdecydujesz
o pominięciu — numeracja ma się zgadzać z edytorem.

## Hint 2

`const line = raw.trim(); if (!line) continue;` — pomijanie po trim,
ale numer policzony.

## Hint 3

`try { yield { line: number, value: JSON.parse(line) }; } catch` — w catchu
rzuć własny `Error` z numerem linii; nie kontynuuj po błędzie.
