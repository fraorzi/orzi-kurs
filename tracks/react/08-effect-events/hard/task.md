# Polling z reaktywnym interwałem

Zaimplementuj `SearchPolling`.

`scheduler.start(intervalMs, callback)` uruchamia zewnętrzny polling i zwraca cleanup.
Każdy tick ma wywołać najnowszy `onPoll` z najnowszym `query`.

Zmiana `intervalMs` musi zrestartować scheduler. Zmiana `query` lub identity
`onPoll` nie może go restartować, ale następny tick ma użyć nowych wartości.
Wyraź tę granicę przez Effect Event i właściwe zależności efektu.
