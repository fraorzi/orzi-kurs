# Zwróć idempotentny cleanup

Podepnij listener EventEmittera i zwróć funkcję, którą można bezpiecznie wywołać wiele razy.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
