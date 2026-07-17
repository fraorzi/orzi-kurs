# Produkcyjne CLI i NDJSON

## Kiedy

Gdy narzędzie ma być składane w pipeline, czytelne dla człowieka i maszyny oraz komunikować przewidywalne kody wyjścia.

## Pułapki

Dane trafiają na stdout, diagnostyka na stderr; JSON nie może być mieszany z prose; SIGPIPE i przerwanie nie powinny wyglądać jak błąd domenowy.

## Źródła

- [Node.js 24 API: cli,process,readline](https://nodejs.org/download/release/latest-v24.x/docs/api/cli.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
