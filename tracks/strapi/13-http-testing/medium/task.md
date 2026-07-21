# Medium — wyegzekwuj wymagany poziom roli przez HTTP

Endpoint ma minimalny wymagany poziom roli (np. tylko `editor` i wyżej
może aktualizować artykuł). Zaimplementuj `solve(requiredRole)`, który
zwraca handler `(request: Request) => Promise<Response>` czytający rolę
wywołującego z nagłówka `x-role`:

- brak nagłówka `x-role` (albo wartość `"anonymous"`) przy
  `requiredRole` innym niż `"anonymous"` to `401`, koperta błędu
  `{ error: { status: 401, name: "UnauthorizedError", message: "Brak
  uwierzytelnienia" } }` — nie wiemy, kim jest wywołujący;
- rola obecna, ale niższa w hierarchii `anonymous < editor < admin` niż
  `requiredRole`, to `403`, `{ error: { status: 403, name:
  "ForbiddenError", message: "Brak uprawnień" } }` — wiemy, kim jest
  wywołujący, ale to za mało;
- rola równa albo wyższa niż `requiredRole` to `200` z `{ data: { ok:
  true } }`;
- nigdy nie traktuj brakującego nagłówka jako najwyższego uprawnienia —
  domyślna, nierozpoznana tożsamość ma **najmniej** praw, nie najwięcej.
