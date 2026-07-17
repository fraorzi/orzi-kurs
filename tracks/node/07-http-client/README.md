# Klient HTTP: fetch, timeout, retry

Node ma wbudowany `fetch` (silnik Undici) — ten sam standard co w przeglądarce.
Odporny klient HTTP to trzy warstwy decyzji:

**Walidacja odpowiedzi.** `fetch` odrzuca promise tylko przy błędzie sieci.
Status 500 to *udane* żądanie — `response.ok` i nagłówek `content-type` trzeba
sprawdzić samemu, zanim zawołasz `response.json()`. Inaczej błędny backend
objawia się jako `SyntaxError: Unexpected token` z parsera JSON.

**Anulowanie i timeout.** Standardowy mechanizm to `AbortSignal`:
`AbortSignal.timeout(ms)` daje sygnał ubijający żądanie po czasie,
a `AbortSignal.any([parent, timeout])` łączy go z anulowaniem nadrzędnym
(użytkownik zamknął stronę, serwer się wyłącza). Timeout nie może wyciekać:
złożenie sygnałów zostaw platformie zamiast ręcznie zarządzać timerami.

**Retry z głową.** Ponawiaj tylko to, co bezpieczne i sensowne:

- metody idempotentne (GET), nie mutacje;
- statusy przejściowe: `429 Too Many Requests`, `503 Service Unavailable`;
- z poszanowaniem nagłówka `Retry-After` (sekundy);
- ze skończonym limitem prób — po wyczerpaniu zwróć ostatnią odpowiedź,
  niech decyzję podejmie warstwa wyżej.

Wstrzykiwanie `fetch` i `sleep` jako parametrów to nie akademicki dodatek —
dzięki temu klient testuje się deterministycznie, bez sieci i realnego czasu.

## Kiedy używać

- Każda komunikacja z zewnętrznym API — walidacja statusu i typu to minimum.
- Operacje z budżetem czasowym: timeout przez sygnał, nie `Promise.race`
  z gołym timerem.
- Integracje z limitowanymi API (429 + `Retry-After`).

## Kiedy unikać

- Nie ponawiaj POST-ów bez klucza idempotencji.
- Nie retry'uj błędów 4xx poza 429 — to błędy klienta, powtórka nic nie zmieni.
- Nie łącz sygnałów ręcznym `addEventListener`, skoro jest `AbortSignal.any`.

## Pułapki

- `response.ok` to status 200–299; przekierowania fetch rozwiązuje sam.
- `content-type` bywa z suffiksem (`application/json; charset=utf-8`) —
  porównuj przez `includes`, nie `===`.
- Sygnał z `AbortSignal.timeout` odrzuca żądanie błędem `TimeoutError`,
  anulowanie rodzica — `AbortError`; rozróżniaj je w obsłudze.
- `Retry-After` to sekundy; brak nagłówka nie może oznaczać `NaN` w `sleep`.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Global fetch](https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html#fetch)
- [MDN: AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
