# Niezależne statusy równoległych formularzy

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `WorkspaceOperations` z dwoma formularzami:

- `Eksportuj dane` uruchamia `exportData`,
- `Archiwizuj workspace` uruchamia `archiveWorkspace`.

Każdy przycisk ma być wyłączony i pokazywać tekst zakończony `…` tylko podczas
pracy własnego formularza. Pending eksportu nie może blokować przycisku
archiwizacji i odwrotnie.

Utwórz reużywalny przycisk korzystający z `useFormStatus`, bez wspólnego stanu
pending i bez przekazywania flagi `busy` przez props.
