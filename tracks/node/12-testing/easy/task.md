# Wstrzyknij granicę czasu

Funkcja cache ma przyjmować `now`, dzięki czemu TTL jest testowalny bez sleep i fałszywych timerów.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
