# Easy — zwróć kontrakt REST zgodny ze Strapi

Endpoint pojedynczego zasobu (`GET /api/articles/:documentId`) ma
trzymać się stałego kontraktu Strapi: sukces to `{ data: <dokument> }`
ze statusem `200`, brak zasobu to koperta błędu `{ error: { status,
name, message } }` ze statusem `404`. Zaimplementuj
`solve(store)`, który zwraca handler `(request: Request) =>
Promise<Response>`:

- wyciągnij `documentId` z ostatniego segmentu ścieżki URL-a żądania;
- gdy `store.get(documentId)` istnieje, zwróć `Response.json({ data:
  <dokument> })` ze statusem `200`;
- gdy nie istnieje, zwróć `Response.json({ error: { status: 404, name:
  "NotFoundError", message: "Nie znaleziono dokumentu" } })` ze statusem
  `404` — nie rzucaj, nie zwracaj `undefined` jako body;
- każda odpowiedź ma nagłówek `Content-Type: application/json` (domyślny
  efekt `Response.json`, nie nadpisuj go ręcznie).
