# Reset edytora po zmianie encji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `ContactEditor`.

Wewnętrzny `Editor` ma renderować label `Nazwa kontaktu` oraz uncontrolled input
z `defaultValue={contact.name}`. `ContactEditor` ma użyć `selected.id` jako `key`
instancji `Editor`, aby zmiana wybranego kontaktu resetowała draft i focusowała
logikę na nowej encji.

Nie synchronizuj inputa efektem.
