# Edytowalna lista z poprawnym key

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`EditableTaskList` dostaje listę zadań. Wyrenderuj `ul`, a dla każdego zadania:

- `li` ze stabilnym `key={task.id}`,
- `input` z `defaultValue={task.title}`,
- nazwę dostępną `Nazwa zadania <task.id>`.

Po zmianie kolejności ten sam rekord ma zachować własną edytowaną wartość.
Nie używaj indeksu tablicy jako key.
