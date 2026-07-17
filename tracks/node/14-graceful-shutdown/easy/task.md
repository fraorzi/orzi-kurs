# Zbuduj idempotentny shutdown

Uruchom listę cleanupów tylko raz, zachowując wspólny Promise dla równoległych wywołań.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
