# Procesy potomne i worker threads

## Kiedy

Gdy trzeba uruchomić zewnętrzny program albo wynieść kosztowną pracę CPU poza główny event loop z kontrolowanym protokołem.

## Pułapki

`exec` z tekstem użytkownika otwiera command injection; worker nie przyspiesza I/O; brak korelacji, timeoutu i limitu kolejki zamienia pulę w źródło leaków.

## Źródła

- [Node.js 24 API: child_process,worker_threads](https://nodejs.org/download/release/latest-v24.x/docs/api/child_process.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
