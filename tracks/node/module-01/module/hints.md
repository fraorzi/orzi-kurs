## Hint 1

Zacznij od `lines` — to temat 09 plus `StringDecoder` z tematu 04. Numer
linii inkrementuj przy każdym wydaniu, także dla końcówki bez newline.

## Hint 2

Limit łączny bajtów zaimplementuj jako osobny async generator opakowujący
chunki (`limitBytes`) — rzuca zanim wypuści chunk ponad limit, a `lines`
nie musi nic wiedzieć o limitach.

## Hint 3

W `analyzeLog` trzymaj jedną funkcję `fail(line, reason)`: dopisuje błąd
i rzuca, gdy `parseErrors.length > maxParseErrors` — wszystkie trzy źródła
błędów (JSON, level/message, długość linii) przechodzą przez nią.

## Hint 4

Kolejność sprawdzeń w pętli: sygnał → pusta linia → długość w bajtach →
`parseRecord`. Poprawny rekord to inkrement `counts[record.level]`
i `processed`.
