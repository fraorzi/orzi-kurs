# Medium — napisz cienki kontroler z sanitization

Kontroler custom endpointu ma tylko przekazać wywołanie do serwisu i
zabezpieczyć wynik przed przypisaniem do odpowiedzi — bez logiki domenowej.
Zaimplementuj `solve(deps, ctx)`:

- wywołaj `deps.service(ctx.params.documentId, ctx.state.user.id)` —
  dokładnie te dwa argumenty, w tej kolejności;
- dopiero na surowym wyniku wywołaj `deps.sanitize(...)` — nigdy nie
  przypisuj do `ctx.body` tego, co zwrócił `service` bezpośrednio;
- przypisz do `ctx.body` **wynik `sanitize`**, nie oryginał — pola
  wewnętrzne (np. `secret`), które `service` zwraca niesanitizowane, nie
  mogą przejść dalej.
