# Event loop Node i kontekst asynchroniczny

Event loop Node ma fazy (timers → pending → poll → check → close), a między
nimi — i po każdym callbacku — opróżniana jest kolejka **mikrotasków**
(promisy, `queueMicrotask`). Z tego wynikają dwie praktyczne reguły:

- **Mikrotaski nie oddają sterowania.** `await Promise.resolve()` wraca do tej
  samej "tury" — nieskończony łańcuch mikrotasków zagłodzi timery, I/O
  i rendering, bo pętla nie przejdzie do następnej fazy.
- **`setImmediate` oddaje sterowanie fazie check.** To właściwy sposób na
  podzielenie długiej pracy CPU: przetwórz partię, `await setImmediate()`
  z `node:timers/promises`, kontynuuj. Między partiami pętla obsłuży I/O.

Synchroniczna praca blokuje wszystko niezależnie od tego, jak została
zaplanowana — `await` nie czyni obliczeń współbieżnymi, tylko wyznacza punkty,
w których pętla może wtrącić inną pracę.

## AsyncLocalStorage

`AsyncLocalStorage` z `node:async_hooks` daje **kontekst podążający za
przepływem asynchronicznym**: wartość ustawiona przez `storage.run(value, fn)`
jest widoczna w `storage.getStore()` w każdym awaicie, callbacku i timerze
wywodzącym się z `fn` — bez przekazywania parametru przez każdą warstwę.

To standardowy mechanizm request ID / trace context w serwerach: middleware
robi `als.run(requestId, () => handler(req))`, a logger trzy warstwy niżej
czyta `als.getStore()`. Równoległe żądania mają odizolowane konteksty.
Poza kontekstem `getStore()` zwraca `undefined` — API powinno to traktować
jako błąd programisty, nie cichy fallback.

## Kiedy używać

- Dzielenie pracy CPU w procesie obsługującym również I/O.
- Request ID, trace context, tenant — dane przekrojowe, które nie są logiką.
- Diagnoza "dlaczego timer/health-check nie odpala pod obciążeniem".

## Kiedy unikać

- Nie przenoś danych domenowych przez AsyncLocalStorage — to ukryty parametr;
  logika ma dostawać argumenty jawnie.
- Nie używaj `setImmediate` tam, gdzie praca jest krótka — yield ma koszt.
- Dla ciężkiego CPU rozważ worker thread (temat 11) zamiast dzielenia partii.

## Pułapki

- `process.nextTick` wykonuje się **przed** mikrotaskami promisów i potrafi
  głodzić jeszcze skuteczniej — w nowym kodzie preferuj `queueMicrotask`.
- `setTimeout(0)` to faza timers, `setImmediate` — check; w callbacku I/O
  `setImmediate` odpala się pierwsze, poza nim kolejność bywa różna.
- Kontekst ALS ginie, gdy callback rejestrowany jest przez API nieprzenoszące
  kontekstu (np. własna pula callbacków zbierana synchronicznie do tablicy).

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [timers/promises](https://nodejs.org/download/release/latest-v24.x/docs/api/timers.html#timers-promises-api)
- [AsyncLocalStorage](https://nodejs.org/download/release/latest-v24.x/docs/api/async_context.html)
- [Event loop guide](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
