# Historia statusu z undo i redo

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `WorkflowHistory`.

Status ma jedną z wartości: `backlog`, `doing`, `done`. Komponent renderuje `Status`,
przyciski ustawiające każdy status oraz `Cofnij` i `Ponów`.

Reducer przechowuje `past`, `present` i `future`:

- zmiana statusu dopisuje poprzedni do historii i czyści future,
- undo przenosi ostatni element past do present,
- redo przenosi pierwszy element future do present,
- brak dostępnej operacji zwraca ten sam stan.

Użyj trzeciego argumentu `useReducer` do utworzenia historii z `initialStatus`.
