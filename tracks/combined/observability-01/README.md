# obserwowalność — korelacja, logi i metryki bez PII

Projekt przekrojowy: warstwa obserwowalności zamienia surowe zdarzenie
żądania HTTP na dwa artefakty — **log** (do korelacji per żądanie) i
**metrykę** (do agregacji). Modeluje decyzje, które przewijają się przez
Node, Next i całą warstwę operacyjną: co logować, jak nie wysadzić
kardynalności metryk i jak nie wyciec danych osobowych.

## Kontekst

Incydent w usłudze trzeba zdiagnozować po sygnałach, które ona sama emituje.
Log musi pozwolić skorelować konkretne żądanie (przez `requestId`), a metryka
— zagregować czasy odpowiedzi bez eksplozji serii czasowych. Oba artefakty
przechodzą przez granicę zaufania: nie mogą nieść query stringa (PII w
parametrach), `userId` ani treści błędu (sekrety w komunikatach).

## Decyzje

- **Ścieżka bez query stringa.** `new URL(...).pathname` odcina parametry,
  które bywają nośnikiem PII i wysadzają kardynalność route w metryce.
- **`statusClass` zamiast surowego kodu.** Label `2xx`/`5xx` grupuje statusy;
  surowy kod jako label tworzyłby osobną serię czasową na każdą wartość.
- **Allow-lista pól logu.** Log budujemy z wybranych bezpiecznych pól, nie
  przez usuwanie wrażliwych z surowego zdarzenia — nowe pole nie wycieknie.
- **`outcome` spójne z klasą statusu.** Próg ≥ 500 = `error` liczony w jednym
  miejscu, żeby log i metryka nie rozjeżdżały się w interpretacji.

## Pułapki

- Query string w `path`/`route` to jednocześnie wyciek PII i wysoka
  kardynalność metryki.
- Surowy status jako label metryki mnoży serie czasowe bez potrzeby.
- Redakcja przez blocklistę pól przecieka, gdy dojdzie nowe pole; allow-lista nie.
- `durationMs` jako label (zamiast wartości) czyni metrykę bezużyteczną —
  czas to wartość agregowana, nie wymiar.

## Źródła (audyt 2026-07-20)

- [OpenTelemetry JS: getting started (Node)](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- [Node.js 24: AsyncLocalStorage (correlation context)](https://nodejs.org/download/release/latest-v24.x/docs/api/async_context.html)
