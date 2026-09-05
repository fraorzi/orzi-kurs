# Tablica zadań z jednym miejscem aktualizacji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `TaskBoard`.

Komponent otrzymuje `initialTasks` i `createId`. Ma kontrolowane pole `Nowe zadanie`,
przycisk `Dodaj` oraz listę z checkboxem i przyciskiem `Usuń {tytuł}` dla każdego
zadania.

Reducer obsługuje akcje:

- dodania niepustego zadania,
- przełączenia `done`,
- usunięcia po ID.

Event handlery mają jedynie zbudować akcję. Reducer nie mutuje tablicy ani rekordów.
