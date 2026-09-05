# Hard - zbuduj ograniczoną kolejkę wysyłki

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Między zerwaniem a ponownym OPEN aplikacja dalej wysyła. Zaimplementuj
`solve(maxQueuedBytes)` - bufor wysyłki:

- `enqueue(data)`: dolicza rozmiar w **bajtach** (`Buffer.byteLength`);
  przekroczenie limitu → `Error` (bufor bez limitu to wyciek pamięci);
  po `close()` → `Error`;
- `flush(send)`: opróżnia kolejkę **FIFO** przez `send`, zerując licznik;
  po `close()` jest no-opem;
- `queuedBytes()`: bieżący rozmiar bufora;
- `close()`: czyści kolejkę i licznik - do martwego socketa się nie buforuje.
