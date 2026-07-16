## Hint 1

Import powinien mieć postać `import { JOB_STATES, type Job, type JobResult }`.

## Hint 2

Sprawdź anulowanie przed `try`, żeby `execute` w ogóle nie zostało wywołane.

## Hint 3

W `catch` użyj `error instanceof Error ? error.message : "unknown error"`.
