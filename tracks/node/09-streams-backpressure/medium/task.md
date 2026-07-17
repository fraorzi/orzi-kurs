# Respektuj drain

Wysyłaj chunki do minimalnego Writable; gdy `write` zwróci false, poczekaj na `drain` przed kolejnym zapisem.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
