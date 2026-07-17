# Izoluj request ID

Zbuduj API oparte na AsyncLocalStorage: `run(id, fn)` i `current()` rzucające poza kontekstem.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
