# Zdarzenia i anulowanie

## Kiedy

Gdy integrujesz długowieczne źródła zdarzeń, oczekujesz pojedynczego zdarzenia albo propagujesz anulowanie przez kilka warstw.

## Pułapki

Nieobsłużone `error` kończy proces; listener bez cleanupu wycieka; anulowanie musi zdejmować listener i zachowywać przyczynę sygnału.

## Źródła

- [Node.js 24 API: events,globals](https://nodejs.org/download/release/latest-v24.x/docs/api/events.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
