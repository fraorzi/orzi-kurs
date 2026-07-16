# Edytowalna lista z poprawnym key

`EditableTaskList` dostaje listę zadań. Wyrenderuj `ul`, a dla każdego zadania:

- `li` ze stabilnym `key={task.id}`,
- `input` z `defaultValue={task.title}`,
- nazwę dostępną `Nazwa zadania <task.id>`.

Po zmianie kolejności ten sam rekord ma zachować własną edytowaną wartość.
Nie używaj indeksu tablicy jako key.
