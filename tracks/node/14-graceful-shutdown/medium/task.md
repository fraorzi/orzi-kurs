# Śledź aktywne żądania

Tracker ma zwracać `enter()` z idempotentnym leave i `drain(signal)`, które czeka aż licznik spadnie do zera.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
