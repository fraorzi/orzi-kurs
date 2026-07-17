## Hint 1

Jedna instancja `new AsyncLocalStorage<string>()` w domknięciu fabryki;
`run` deleguje do `storage.run(id, fn)`.

## Hint 2

`current()` czyta `storage.getStore()`; `undefined` oznacza wywołanie poza
kontekstem — wtedy `throw`, nie wartość domyślna.

## Hint 3

Izolację równoległych kontekstów i przeżywanie `await` dostajesz od
AsyncLocalStorage za darmo — jeżeli trzymasz ID w zwykłej zmiennej modułu,
test równoległości to wykryje.
