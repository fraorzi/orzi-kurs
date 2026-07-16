# Tablica zadań z jednym miejscem aktualizacji

Zaimplementuj `TaskBoard`.

Komponent otrzymuje `initialTasks` i `createId`. Ma kontrolowane pole `Nowe zadanie`,
przycisk `Dodaj` oraz listę z checkboxem i przyciskiem `Usuń {tytuł}` dla każdego
zadania.

Reducer obsługuje akcje:

- dodania niepustego zadania,
- przełączenia `done`,
- usunięcia po ID.

Event handlery mają jedynie zbudować akcję. Reducer nie mutuje tablicy ani rekordów.
