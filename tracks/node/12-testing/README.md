# Testowanie kodu Node

## Kiedy

Gdy chcesz testować zachowanie bez realnej sieci, czasu i wspólnego stanu, a integrację ograniczać do kontrolowanych granic procesu i systemu plików.

## Pułapki

Mockowanie implementacji zamiast granicy daje kruche testy; wspólne fixture'y przeciekają między testami; zegar i moduły globalne trzeba zawsze przywrócić.

## Źródła

- [Node.js 24 API: test](https://nodejs.org/download/release/latest-v24.x/docs/api/test.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
