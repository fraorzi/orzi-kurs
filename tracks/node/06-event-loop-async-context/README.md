# Event loop i kontekst asynchroniczny

## Kiedy

Gdy trzeba utrzymać responsywność procesu, rozumieć kolejność kolejek i przenosić request ID bez przepychania go przez każdy parametr.

## Pułapki

Rekurencyjny `nextTick` zagłodzi I/O; mikrotaski nie są mechanizmem chunkowania CPU; globalna zmienna nie izoluje równoległych żądań.

## Źródła

- [Node.js 24 API: timers,async_context,process](https://nodejs.org/download/release/latest-v24.x/docs/api/timers.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
