# fetch, AbortController i błędy HTTP

`fetch` to wbudowane API do żądań HTTP (dziś także w Node). Zwraca obietnicę `Response`.
Największa pułapka: **`fetch` nie odrzuca obietnicy przy błędzie HTTP** — status 404 czy
500 to nadal „udana" odpowiedź. Odrzucenie następuje tylko przy błędzie sieci.

## Podstawy i sprawdzanie statusu

```js
const res = await fetch(url);
res.ok;      // true dla statusów 200–299
res.status;  // 404, 500, ...
const data = await res.json(); // parsuje ciało jako JSON (może rzucić przy złym JSON)
```

Dlatego **zawsze** sprawdzaj `res.ok`:

```js
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return res.json();
```

## POST z JSON-em

```js
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload), // body to string, nie obiekt
});
```

Bez nagłówka `Content-Type` serwer może nie rozpoznać ciała jako JSON.

## AbortController — anulowanie i timeout

`AbortController` daje `signal`, który przekazujesz do `fetch`. Wywołanie `abort()`
powoduje odrzucenie obietnicy błędem o `name === "AbortError"`.

```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 3000);
try {
  const res = await fetch(url, { signal: controller.signal });
  return await res.json();
} catch (err) {
  if (err.name === "AbortError") throw new Error("timeout");
  throw err;
} finally {
  clearTimeout(timer); // zawsze sprzątaj timer
}
```

Ten sam mechanizm służy do **anulowania na żądanie** (np. gdy użytkownik zmienia zapytanie
w wyszukiwarce albo komponent się odmontowuje).

Nowsze skróty: `AbortSignal.timeout(ms)` daje gotowy sygnał timeoutu (bez ręcznego
kontrolera i `clearTimeout`; błąd ma wtedy `name === "TimeoutError"`, nie `"AbortError"`),
a `AbortSignal.any([...])` łączy kilka sygnałów w jeden. W zadaniach budujemy timeout
ręcznie, żeby zrozumieć mechanizm.

## Ponawianie (retry)

Ponawiaj to, co ma szansę się udać: **błędy sieci** i **5xx** (problem serwera).
**Nie ponawiaj 4xx** — to błąd żądania (zły URL, brak autoryzacji, zła walidacja);
kolejna próba da ten sam wynik.

## Kiedy używać

- Każde żądanie HTTP z przeglądarki i z Node (18+) — `fetch` jest standardem.
- `AbortController` przy: timeoutach, anulowaniu nieaktualnych zapytań (race conditions),
  sprzątaniu w `useEffect`.
- Retry z rozsądną polityką dla operacji idempotentnych (GET).

## Kiedy unikać

- Ponawianie żądań nieidempotentnych (POST tworzący zasób) bez klucza idempotencji —
  możesz utworzyć duplikaty.
- Retry bez limitu i bez odstępu (backoff) — dobijesz padający serwer.
- `fetch` do strumieni/dwukierunkowej komunikacji — tam WebSocket/SSE.

## Pułapki

- **`fetch` nie rzuca na 404/500** — bez `if (!res.ok)` przetworzysz stronę błędu jak dane.
- `res.json()` można wywołać **raz** — ciało odpowiedzi to strumień (`res.bodyUsed`).
- `body` musi być stringiem (albo `FormData`/`Blob`) — obiekt trzeba `JSON.stringify`.
- Zapomniany `clearTimeout` przy timeoucie → wiszący timer.
- Błąd abortu ma `name === "AbortError"` — rozpoznawaj go po `name`, nie po treści komunikatu.
- Anulowanie nie „cofa" żądania na serwerze — tylko przestajesz czekać na odpowiedź.
