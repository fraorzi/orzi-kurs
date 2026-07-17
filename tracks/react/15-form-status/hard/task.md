# Niezależne statusy równoległych formularzy

Zaimplementuj `WorkspaceOperations` z dwoma formularzami:

- `Eksportuj dane` uruchamia `exportData`,
- `Archiwizuj workspace` uruchamia `archiveWorkspace`.

Każdy przycisk ma być wyłączony i pokazywać tekst zakończony `…` tylko podczas
pracy własnego formularza. Pending eksportu nie może blokować przycisku
archiwizacji i odwrotnie.

Utwórz reużywalny przycisk korzystający z `useFormStatus`, bez wspólnego stanu
pending i bez przekazywania flagi `busy` przez props.
