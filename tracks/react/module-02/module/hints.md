## Hint 1

Store powinien przechowywać zmienną `snapshot`; aktualizuj ją przed powiadomieniem
listenerów.

## Hint 2

Lazy initializer draftu to `useState(() => storage.getItem(key) ?? initialValue)`.

## Hint 3

W async Action po `await` opakuj aktualizacje Reactowego stanu w
`startTransition`.

## Hint 4

`SubmitButton` musi być potomkiem `<form>`, aby `useFormStatus` widział pending.

## Hint 5

Portal zmienia tylko miejsce DOM. Zwróć `createPortal(..., toastContainer)`.

## Hint 6

Odczytaj `initialIncidentsPromise` przez `use` w potomku `<Suspense>`, a reducer
`useOptimistic` niech dokłada pending draft na początek aktualnej listy.
