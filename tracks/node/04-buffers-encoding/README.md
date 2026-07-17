# Buffery i kodowanie tekstu

`Buffer` to widok na surowe bajty (podklasa `Uint8Array`). String w JS to
sekwencja jednostek UTF-16, a na dysku i w sieci żyje UTF-8 — i to rozróżnienie
jest źródłem całej klasy błędów:

- **liczba znaków ≠ liczba bajtów**: `"ż".length === 1`, ale
  `Buffer.byteLength("ż") === 2`, emoji potrafi mieć 4 bajty;
- limity (rozmiar wiadomości, kolumny bazy, nagłówka) prawie zawsze dotyczą
  **bajtów**, więc walidacja `text.length` jest po prostu błędna;
- znak UTF-8 może zostać **przecięty między chunkami** streamu; naiwne
  `chunk.toString()` na każdej porcji wstawia znak zastępczy U+FFFD.

Do składania tekstu z chunków służy `string_decoder`: `StringDecoder` buforuje
niedokończone sekwencje między `write()` a kolejnym chunkiem, a `end()`
opróżnia resztę.

## Protokoły binarne

Ramka binarna to jawny kontrakt układu bajtów, np. length-prefixed frame:
nagłówek długości big-endian, bajt typu, payload. `Buffer` daje precyzyjne
narzędzia: `writeUInt32BE`, `writeUInt8`, `copy`, `subarray`. Kluczem jest
zapisanie kontraktu wprost (co obejmuje pole długości? jaka kolejność bajtów?)
— dokładnie tak, jak robią to protokoły w rodzaju WebSocket czy TCP framingu.

## Kiedy używać

- Limity rozmiaru wejścia (request body, kolejka, log) — zawsze w bajtach.
- Dekodowanie tekstu ze streamów: pliki, sockety, stdout procesów potomnych.
- Implementacja i parsowanie formatów binarnych.

## Kiedy unikać

- Nie używaj `Buffer` do zwykłej pracy na stringach — konwertuj na granicy.
- Nie porównuj sekretów przez `buffer.equals` — do tego służy
  `crypto.timingSafeEqual` (temat 13).
- Nie używaj `allocUnsafe`, jeżeli nie nadpisujesz całego bufora.

## Pułapki

- `text.length` liczy jednostki UTF-16, nie bajty i nie "znaki widoczne".
- `Buffer.from(chunk).toString()` per chunk psuje przecięte znaki — użyj
  `StringDecoder` albo `TextDecoder` z opcją `stream: true`.
- `allocUnsafe` zwraca niewyzerowaną pamięć — wyciek danych, jeśli fragment
  zostanie niezapisany.
- Odczyt wielobajtowych liczb wymaga zgodności endianness po obu stronach.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Buffer](https://nodejs.org/download/release/latest-v24.x/docs/api/buffer.html)
- [String decoder](https://nodejs.org/download/release/latest-v24.x/docs/api/string_decoder.html)
