## Hint 1

Walidacja ścieżek to jeden regex zakotwiczony na całość:
`/^[a-zA-Z0-9._/-]+$/` — testuj **obie** ścieżki.

## Hint 2

Format: `["webp", "png"].includes(format)`, inaczej `throw`.

## Hint 3

Zwracany obiekt ma literalne `shell: false` — to część kontraktu, którą
wywołujący przekaże wprost do `execFile`/`spawn`.
