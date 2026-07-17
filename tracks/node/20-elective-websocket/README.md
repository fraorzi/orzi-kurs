# Elective: klient WebSocket

## Kiedy

Gdy usługa Node utrzymuje dwukierunkowe połączenie klienckie i potrzebuje jawnego lifecycle, reconnectu oraz ograniczonej kolejki danych.

## Pułapki

Globalny WebSocket jest klientem, nie serwerem; reconnect bez backoffu tworzy burzę; `send` przed OPEN i nieograniczona kolejka zużywają pamięć.

## Źródła

- [Node.js 24 API: globals](https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
