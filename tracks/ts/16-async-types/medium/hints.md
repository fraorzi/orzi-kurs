## Hint 1

Sukces to `return { ok: true, value: await operation() }`.

## Hint 2

Abort: `error instanceof DOMException && error.name === "AbortError"`.

## Hint 3

Zwykły message odczytuj dopiero po `error instanceof Error`.
