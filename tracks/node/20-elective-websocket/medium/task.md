# Medium — policz backoff reconnectu

Zerwane połączenie wraca przez exponential backoff z **pełnym jitterem**.
Zaimplementuj `solve(attempt, baseMs, capMs, random)`:

- sufit opóźnienia: `min(capMs, baseMs * 2^attempt)`;
- wynik: `floor(random() * sufit)` — jitter mnoży całość (full jitter),
  co rozprasza stado klientów wracających po awarii serwera;
- walidacja: `attempt` całkowite ≥ 0, `baseMs ≥ 1`, `capMs ≥ baseMs`,
  inaczej `Error`;
- `random()` poza zakresem `[0, 1)` to błąd kontraktu RNG → `Error`.
