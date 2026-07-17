# Bufory, kodowania i dane binarne

## Kiedy

Gdy protokół, plik lub socket operuje na bajtach, a granice chunków i kodowanie UTF-8 nie pokrywają się z granicami znaków.

## Pułapki

`Buffer.length` liczy bajty, nie znaki; `slice` może współdzielić pamięć; dekodowanie każdego chunka osobno może uszkodzić wielobajtowy znak.

## Źródła

- [Node.js 24 API: buffer,string_decoder](https://nodejs.org/download/release/latest-v24.x/docs/api/buffer.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
