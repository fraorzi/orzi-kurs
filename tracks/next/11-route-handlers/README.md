# Route Handlers i Backend for Frontend

`route.ts` definiuje jawny kontrakt HTTP oparty na Web `Request` i `Response`.
Obsługuje GET, POST, PUT, PATCH, DELETE, HEAD i OPTIONS. Nie uczestniczy w layoutach
ani client navigation i nie może współistnieć z `page.tsx` w tym samym segmencie.

Handler powinien walidować metodę, query, nagłówki i JSON jako niezaufane wejście,
zwracać właściwy status oraz nie ujawniać szczegółów awarii. Body ma limit przed
pełnym odczytem, a authn/authz obowiązuje tak samo jak w Action.

## Cache Components i BFF

GET nie jest po prostu „zawsze cache'owany”. Z Cache Components deterministyczny
handler może zostać prerenderowany, request-time API zatrzymuje prerender, a
niecache'owane dane można wydzielić do helpera z `use cache` — dyrektywa nie może
znajdować się bezpośrednio w ciele Route Handlera.

BFF ukrywa sekret upstreamu, mapuje jego błędy na stabilny kontrakt i zwraca tylko
potrzebne pola. Musi propagować anulowanie lub timeout, ograniczać payload oraz nie
przekazywać bezmyślnie cookie i nagłówków klienta.

## Kiedy używać

- Publicznego API, webhooka, callbacku OAuth, feedu lub kontraktu dla innego klienta.
- BFF, gdy frontend potrzebuje stabilnego, ograniczonego adaptera upstreamu.
- OPTIONS i allow-list CORS, gdy endpoint świadomie obsługuje inne originy.
- Native Request/Response, gdy rozszerzenia `NextRequest` nie są potrzebne.

## Pułapki

- `page.tsx` i `route.ts` w tym samym segmencie.
- Odczyt całego body bez limitu i walidacji content type.
- `Access-Control-Allow-Origin: *` przy credentials lub prywatnych danych.
- Przekazywanie do upstreamu wszystkich nagłówków requestu.
- Brak timeoutu i wiszące połączenia BFF.
- Zwracanie surowego błędu lub pełnego modelu upstreamu z polami wewnętrznymi.

## Źródła

- <https://nextjs.org/docs/app/getting-started/route-handlers>
- <https://nextjs.org/docs/app/api-reference/file-conventions/route>
- <https://nextjs.org/docs/app/guides/backend-for-frontend>
- <https://developer.mozilla.org/en-US/docs/Web/API/Request>
- <https://developer.mozilla.org/en-US/docs/Web/API/Response>
