## Hint 1

Operator `->` zwraca wartość JSON — dla stringa to tekst w cudzysłowach
(`"pl"`, nie `pl`). `->>` odpakowuje wynik do zwykłego tekstu bez
cudzysłowów.

## Hint 2

Zanim potraktujesz dokument jak typowany DTO, sprawdź `JSON_TYPE` tej
samej ścieżki wyciągniętej przez `->`. Brakujący klucz i literał JSON
`null` to dwie różne rzeczy: pierwszy daje SQL `NULL` z `JSON_TYPE`,
drugi daje string `'NULL'` — oba trzeba odrzucić, bo żadne nie jest
`'STRING'`.

## Hint 3

Kształt: `SELECT id, settings->>'$...' AS language FROM profiles WHERE
JSON_TYPE(settings->'$...') = 'STRING' ORDER BY id`. Test z liczbą,
obiektem, literałem `null` i brakującym kluczem pokaże, czy warunek
naprawdę odsiewa każdy z tych przypadków osobno.
