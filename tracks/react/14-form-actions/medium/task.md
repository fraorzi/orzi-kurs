# Walidacja i wynik przez `useActionState`

Zaimplementuj `CreateProjectForm`.

Nazwa projektu po `trim()` musi mieć co najmniej 3 znaki. Nieprawidłowy formularz
nie wywołuje `createProject` i pokazuje alert `Nazwa musi mieć co najmniej 3 znaki.`.

Dla poprawnej nazwy wywołaj `createProject(name)`. Podczas operacji przycisk ma
być wyłączony i pokazywać `Tworzenie…`. Po sukcesie pokaż status
`Utworzono projekt {projectId}`.

Stan wyniku, dispatcher i pending mają pochodzić z `useActionState`.
