# Polling z reaktywnym interwałem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SearchPolling`.

`scheduler.start(intervalMs, callback)` uruchamia zewnętrzny polling i zwraca cleanup.
Każdy tick ma wywołać najnowszy `onPoll` z najnowszym `query`.

Zmiana `intervalMs` musi zrestartować scheduler. Zmiana `query` lub identity
`onPoll` nie może go restartować, ale następny tick ma użyć nowych wartości.
Wyraź tę granicę przez Effect Event i właściwe zależności efektu.
