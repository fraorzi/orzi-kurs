# Moduł 02 — odporny, typowany klient API

Końcowy projekt tracka TypeScript. Budujesz małą warstwę dostępu do API zamówień:
nieufny JSON przechodzi przez parsery, identyfikatory dostają typ nominalny, błędy
są modelowane unią rozłączną, a żądania współdzielą retry, timeout, anulowanie
i limit współbieżności.

To nie jest ćwiczenie „dopisz typy do `fetch`”. `response.json()` nadal zwraca dane
z zewnętrznego świata — adnotacja generyczna nie sprawi, że będą poprawne w runtime.
Publiczne API klienta obiecuje `Order` dopiero po udanym parsowaniu `unknown`.

## Architektura

```text
src/
├─ types.ts    # kontrakty domeny, Result, parser i transport
├─ parse.ts    # unknown → ParseResult<OrderId | Order | Order[]>
├─ queue.ts    # generyczna kolejka zachowująca typ wyniku zadania
├─ client.ts   # retry, backoff, timeout, AbortSignal i mapowanie błędów
└─ index.ts    # jawna publiczna granica modułu
```

Zależności płyną w jedną stronę. Parsery nie wiedzą nic o HTTP, kolejka nie zna
zamówień, a klient składa te elementy przez małe kontrakty. Dzięki temu każdą
warstwę można sprawdzić osobno i podmienić transport w testach.

## Decyzje projektowe

- `OrderId` jest branded type. Zwykłego `string` nie da się przypadkiem przekazać
  do `getOrder`; marka powstaje dopiero po sprawdzeniu formatu na granicy runtime.
- `Result<T, ApiError>` opisuje przewidywalne porażki w sygnaturze. Konsument musi
  zawęzić `ok`, a następnie `error.kind`.
- Retry obejmuje błędy sieci i statusy 5xx. Błędy 4xx, niepoprawny JSON oraz błąd
  kontraktu odpowiedzi nie znikną od ponowienia tego samego żądania.
- Slot kolejki obejmuje całe logiczne żądanie wraz z jego retry i backoffem.
  Dzięki temu jedna awaria nie omija limitu współbieżności serią kolejnych prób.
- Zewnętrzny `AbortSignal` i wewnętrzny timeout są łączone w jednym
  `AbortController`, a listener i timer są zawsze sprzątane.

## Kiedy używać

- Gdy aplikacja ma kilka endpointów o stabilnym kontrakcie domenowym.
- Gdy dane przychodzą z sieci, storage, kolejki lub innego procesu i nie można
  zaufać samym deklaracjom TypeScript.
- Gdy dashboard, prefetch albo synchronizacja może uruchomić wiele żądań naraz.
- Gdy biblioteka powinna wystawiać przewidywalne błędy bez zmuszania użytkownika
  do rozpoznawania przypadkowych wyjątków transportu.

## Kiedy unikać

- Nie buduj własnej rozbudowanej warstwy sieciowej, jeśli używana biblioteka już
  zapewnia potrzebne retry, cache, deduplikację i anulowanie.
- Nie stosuj automatycznego retry do nieidempotentnych zapisów bez klucza
  idempotencji.
- Nie twórz branded type dla każdej wartości tekstowej; marka ma sens tam, gdzie
  pomylenie dwóch wartości tego samego typu bazowego jest realnym ryzykiem.

## Pułapki

- `fetch` nie odrzuca obietnicy dla 404 ani 500 — status trzeba sprawdzić jawnie.
- `response.json() as Order` wyłącza kontrolę dokładnie na najniebezpieczniejszej
  granicy systemu.
- Timeout bez `AbortController` może zwrócić błąd użytkownikowi, ale pozostawić
  pracujące żądanie w tle.
- Kolejka musi zwolnić slot po sukcesie, odrzuceniu i błędzie synchronicznym.
- `exactOptionalPropertyTypes` odróżnia brak pola od pola ustawionego na
  `undefined`; nie składaj konfiguracji bezmyślnym spreadem.

## Źródła

- TypeScript Handbook — narrowing:
  <https://www.typescriptlang.org/docs/handbook/2/narrowing.html>
- TypeScript Handbook — generics:
  <https://www.typescriptlang.org/docs/handbook/2/generics.html>
- MDN — Fetch API:
  <https://developer.mozilla.org/docs/Web/API/Fetch_API>
- MDN — AbortSignal:
  <https://developer.mozilla.org/docs/Web/API/AbortSignal>
