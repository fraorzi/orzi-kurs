# Hard — wykryj drift typów generowanych

CI ma wyłapać rozjazd między `schema.json` content types a wygenerowanym
`types/generated/contentTypes.d.ts`, zanim ktoś zdeployuje kod, który się
kompiluje na nieaktualnych typach. Oba wejścia to mapy `uid -> fingerprint`
(hash treści dla danego UID). Zaimplementuj `solve(schema, generated)`:

- zwróć UID-y, których fingerprint w `schema` i `generated` się różni —
  także wtedy, gdy UID istnieje tylko w jednym z wejść (brakujący albo
  nadmiarowy wygenerowany typ to też drift);
- pomiń UID-y, dla których oba fingerprinty są identyczne;
- wynik bez duplikatów, posortowany alfabetycznie — deterministyczny output
  jest warunkiem użycia w CI (diff w PR, nie migający test).
