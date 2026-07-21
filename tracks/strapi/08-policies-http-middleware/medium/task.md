# Medium — dodaj bezpieczny correlation ID

Middleware Strapi ma sygnaturę `(config, { strapi }) => async (ctx, next) => ...`
i musi wywołać `next()` dokładnie raz. Zbuduj taki middleware korelacji:
klient może wysłać własny `x-request-id`, ale to, co przyjmiesz, nie może
pochodzić z niekontrolowanego wejścia bez walidacji.

Zaimplementuj `solve(ctx, next, generate)`:

- gdy `ctx.requestId` pasuje do `/^[A-Za-z0-9-]{8,64}$/`, użyj go;
  w przeciwnym razie wygeneruj nowy przez `generate()`;
- zapisz wynikowe id w `ctx.state.requestId` — dalsze warstwy (kontroler,
  logger) czytają je stamtąd, nie z surowego nagłówka;
- ustaw też `ctx.headers["x-request-id"]` na tę samą wartość, żeby klient
  mógł skorelować odpowiedź;
- wywołaj `await next()` dokładnie raz, **po** ustawieniu stanu i nagłówka.
