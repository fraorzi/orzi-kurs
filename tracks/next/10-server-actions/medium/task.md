# Dodaj authz do edycji projektu

`updateProject` sprawdza logowanie, ale nie uprawnienie do konkretnego projektu.
Uzupełnij Action tak, aby kolejno:

1. pobrała sesję i zwróciła `forbidden` bez użytkownika,
2. zwalidowała stringi `projectId` i `title` (title 3–80 po trimie),
3. sprawdziła `canEditProject(userId, projectId)`,
4. dopiero wtedy zapisała projekt,
5. po sukcesie wywołała `updateTag` dla listy i szczegółu użytkownika.

Nie zapisuj ani nie unieważniaj cache'u po żadnym błędzie.
