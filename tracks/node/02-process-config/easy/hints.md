## Hint 1

Iteruj indeksem po `argv`. `--port` zużywa dwa elementy (`argv[++index]` jako
wartość), `--host=` niesie wartość w sobie, `--json` jest samodzielne.

## Hint 2

Wszystko, co nie pasuje do trzech znanych form, kończy się
`throw new Error("Nieznany argument: " + arg)`.

## Hint 3

Port waliduj po pętli: `Number.isInteger(port) && port >= 1 && port <= 65535`.
Pamiętaj, że `Number("80.5")` przechodzi cast, ale nie jest integerem.
