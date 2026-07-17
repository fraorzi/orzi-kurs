## Hint 1

`new URL(rawUrl, "http://localhost").pathname` — baza jest potrzebna, bo
request niesie ścieżkę względną.

## Hint 2

Najpierw zbierz trasy o tym samym pathname; dopiero wśród nich szukaj metody.
Kolejność sprawdzeń: 200 → 405 → 404.

## Hint 3

`[...new Set(metody)].sort()` daje stabilny nagłówek Allow bez duplikatów.
