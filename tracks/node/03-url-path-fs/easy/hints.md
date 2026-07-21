## Hint 1

Cała logika to `new URL(relativeFile, moduleUrl)` — konstruktor URL sam
obsługuje `./`, `../` i zastępowanie ostatniego segmentu bazy.

## Hint 2

Z gotowego obiektu URL zwróć własność `.pathname`.

## Hint 3

Jeśli ręcznie sklejasz stringi albo używasz `node:path`, to znak, że
rozwiązujesz zadanie wbrew jego celowi — baza jest URL-em, nie ścieżką.
