# Hard - koduj ramkę binarną

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Wewnętrzny protokół przesyła wiadomości jako length-prefixed frames.
Zaimplementuj enkoder `solve(type, payload)` budujący ramkę:

| offset | rozmiar | pole |
|---|---|---|
| 0 | 4 bajty | długość big-endian: **1 (bajt typu) + bajty payloadu** |
| 4 | 1 bajt | typ wiadomości |
| 5 | reszta | payload UTF-8 |

- payload koduj jako UTF-8 (długość w bajtach, nie znakach);
- użyj `writeUInt32BE`, `writeUInt8` i `copy` - układ bajtów jest kontraktem,
  odbiorca po drugiej stronie czyta dokładnie te offsety.
