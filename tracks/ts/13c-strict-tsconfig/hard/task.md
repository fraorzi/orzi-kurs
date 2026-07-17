# Hard — ESM, importy typów i `unknown` w catch

Zadanie jest wieloplikowe i działa z `verbatimModuleSyntax` oraz
`useUnknownInCatchVariables`.

W `src/worker.ts`:

- importuj `Job` wyłącznie jako typ,
- zaimplementuj `runJob(job, execute)`,
- sukces zwraca `{ ok: true, value }`,
- każdy rzucony `Error` daje jego `message`,
- inna rzucona wartość daje `"unknown error"`,
- stan `"cancelled"` nie uruchamia `execute` i daje błąd `"job cancelled"`.

Nie zmieniaj kontraktów w `contracts.ts`.
