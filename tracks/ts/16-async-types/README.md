# Typowanie kodu asynchronicznego

`async` zawsze zwraca `Promise`. Dobry kontrakt zachowuje typ wartości po await,
modeluje przewidywalne porażki i nie gubi sygnału anulowania.

## `Awaited<T>`

`Awaited` rekurencyjnie rozpakowuje promise-like wartości. Przy tuple pozwala zachować
typ każdej pozycji podobnie jak `Promise.all`.

## Wynik zamiast ukrytego wyjątku

Jeśli błąd jest spodziewaną częścią przepływu, unia wyniku zmusza do obsługi:

```ts
type AsyncResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: ErrorInfo };
```

Nie oznacza to zakazu wyjątków. Błędy programisty nadal mogą być rzucane.

## `AbortSignal`

Sygnał anulowania jest częścią kontraktu operacji. Sprawdź go przed startem i między
kolejnymi krokami. Po anulowaniu nie uruchamiaj nowych zadań.

## Kiedy używać

- wrapperów API i operacji batch,
- typowanych tuple `Promise.all`,
- funkcji wspierających anulowanie przez `AbortSignal`.

## Kiedy unikać

- `Promise<any>` i generyka wybieranego bez parsera,
- łapania wszystkich wyjątków bez zachowania przyczyny,
- tworzenia własnego tokena anulowania, gdy wystarcza standardowy AbortSignal.

## Pułapki

- `Promise.race` nie anuluje przegranej pracy,
- `catch` dostaje `unknown`,
- wywołanie `abort()` nie cofnie już wykonanych efektów,
- wynik batcha musi zachować kolejność wejścia mimo różnej kolejności zakończeń.

Źródła: TypeScript Utility Types — Awaited; MDN AbortSignal i Promise.all.
