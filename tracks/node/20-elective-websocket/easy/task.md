# Easy — waliduj endpoint WebSocket

Konfiguracja połączenia przychodzi z zewnątrz. Zaimplementuj
`solve(rawUrl, protocols, production)`:

- schemat tylko `ws:` albo `wss:`; w trybie `production` wyłącznie `wss:`;
- credentials w URL (`user:pass@`) są zabronione — lądują w logach
  i historii shella;
- subprotokoły: allow-lista `events.v1`/`json.v1`, duplikaty usuń
  zachowując kolejność; nieznany subprotocol to `Error`;
- zwróć `{ url, protocols }` z obiektem `URL`.
