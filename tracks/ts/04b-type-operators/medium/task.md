# Medium - typowana mapa zdarzeń

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Z `AppEventMap` wyprowadź:

- `EventName` - wszystkie nazwy zdarzeń,
- `EventPayload<K>` - payload konkretnego zdarzenia,
- `EventEnvelope` - unię obiektów `{ type, payload }`, po jednym wariancie na zdarzenie.

Zaimplementuj `makeEvent(type, payload)` tak, aby nazwa wymuszała właściwy payload,
oraz `formatEvent`, która obsługuje całą unię.
