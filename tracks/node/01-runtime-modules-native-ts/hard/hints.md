## Hint 1

To zwykła pętla po `conditions` — pierwszy klucz, dla którego `map[condition]`
istnieje, wygrywa. Kolejność iteracji jest częścią kontraktu.

## Hint 2

`default` sprawdzasz dopiero **po** pętli — jest fallbackiem, nie zwykłym
warunkiem w liście.

## Hint 3

Ścieżka błędu jest częścią zadania: brak dopasowania i brak `default` ma rzucać,
bo dokładnie tak zachowa się runtime Node przy takiej mapie exports.
