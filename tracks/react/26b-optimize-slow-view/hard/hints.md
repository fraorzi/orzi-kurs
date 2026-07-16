## Hint 1

Najpierw wyodrębnij `InternalNote`, aby pisanie nie renderowało dashboardu.

## Hint 2

`useMemo` dla kolejki zależy od `buildQueue`, `tickets` i `filter`.

## Hint 3

Owiń `QueueList` w `memo`. Dzięki stabilnemu wynikowi `useMemo` i stabilnemu
callbackowi Profiler może pominąć render przy identycznych propsach rodzica.

