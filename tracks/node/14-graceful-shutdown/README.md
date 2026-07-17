# Graceful shutdown

## Kiedy

Gdy usługa musi przestać przyjmować ruch, dokończyć pracę w limicie i zwolnić zasoby podczas deployu, SIGTERM lub awarii zależności.

## Pułapki

Handler sygnału może wykonać się wielokrotnie; samo `server.close` nie kończy wszystkich aktywnych operacji; timeout wymaga ścieżki wymuszonej.

## Źródła

- [Node.js 24 API: process,http](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
