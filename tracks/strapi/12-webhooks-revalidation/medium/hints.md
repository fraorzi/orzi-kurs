# Hints

## Hint 1

Sprawdź `seen.has(eventId)` jako pierwszy krok i zwróć `"duplicate"` od
razu — dopiero po tym strażniku wchodzisz w pętlę prób.

## Hint 2

Pętla `for (attempt = 1; attempt <= options.maxAttempts; attempt++)` z
`try/catch` wewnątrz: sukces — dodaj do `seen` i zwróć `"processed"`
natychmiast, z **wnętrza** pętli. Błąd — zapamiętaj go i idź dalej, chyba
że to była ostatnia próba.

## Hint 3

`options.backoff(attempt)` woła się tylko między próbami, czyli gdy
`attempt < options.maxAttempts` — po ostatniej nieudanej próbie pętla się
kończy i rzucasz zapamiętany błąd, zamiast czekać przed rezygnacją.
`seen.add(eventId)` ma się wykonać wyłącznie na ścieżce sukcesu.
