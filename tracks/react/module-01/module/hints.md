## Hint 1

Zacznij od `types.ts`, potem napisz i przetestuj w głowie reducer. Każda gałąź powinna
zwracać nowy stan wyłącznie wtedy, gdy opisuje zmianę.

## Hint 2

Selektory są zwykłymi czystymi funkcjami. `selectVisibleTasks` dla `all` może zwrócić
oryginalną tablicę, a dla pozostałych filtrów wynik `filter`.

## Hint 3

W `context.tsx` nie twórz jednego value `{ state, dispatch }`. Osobne contexty
pozwalają komponentom wysyłającym akcje nie reagować na każdą zmianę danych.

## Hint 4

Komponent formularza potrzebuje lokalnego stanu draftu, ale lista i filtr pochodzą
z providera. Po poprawnym submitcie wykonaj jeden dispatch i `setDraft("")`.

## Hint 5

Kliknięcie filtra wysyła akcję. Reducer zapisuje filtr, a selektor wybiera pasujące zadania.

## Hint 6

Jeśli komponent zaczyna otrzymywać state i dispatch propsami, zatrzymaj się:
`TaskProvider`, `useTaskState` i `useTaskDispatch` są publiczną granicą wewnątrz
feature’u.
