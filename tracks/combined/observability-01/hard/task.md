# Korelacja, logi i metryki bez PII

Warstwa obserwowalności usługi HTTP zamienia surowe zdarzenie żądania na
dwa artefakty: **log** (do korelacji per żądanie) i **metrykę** (do agregacji).
Oba muszą być bezpieczne i tanie w kardynalności.

Zaimplementuj `observe(event)` zwracające `{ log, metric }`:

- `log`: `requestId`, `method`, `path` (sama ścieżka, **bez query string**),
  `status`, `durationMs`, `outcome` (`"error"` dla status ≥ 500, inaczej `"ok"`);
- `metric`: nazwa `http_server_duration_ms`, `value` = `durationMs`, labels
  `{ method, route (= path bez query), statusClass }`, gdzie `statusClass`
  to klasa `"2xx"`/`"5xx"` itd.;
- **nigdy** nie umieszczaj w wyniku `userId`, treści `error`, ani query stringa
  URL — to PII i wektory wysokiej kardynalności/wycieku.

## Kryteria akceptacji

- query string i PII nie pojawiają się w żadnym artefakcie,
- `statusClass` grupuje statusy zamiast używać surowego kodu jako labelki,
- `outcome` i `statusClass` są spójne dla tego samego statusu.
