# Proces, argumenty i konfiguracja

## Kiedy

Gdy aplikacja lub CLI musi uruchamiać się deterministycznie w środowisku lokalnym, CI i produkcji oraz zgłaszać błędy konfiguracji przed rozpoczęciem pracy.

## Pułapki

`process.env` zawiera tylko stringi lub `undefined`; `cwd()` nie jest katalogiem modułu; `process.exit()` może uciąć buforowane wyjście — preferuj `exitCode`.

## Źródła

- [Node.js 24 API: process,cli](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
