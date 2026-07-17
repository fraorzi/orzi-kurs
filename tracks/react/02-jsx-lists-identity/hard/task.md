# Reset edytora po zmianie encji

Zaimplementuj `ContactEditor`.

Wewnętrzny `Editor` ma renderować label `Nazwa kontaktu` oraz uncontrolled input
z `defaultValue={contact.name}`. `ContactEditor` ma użyć `selected.id` jako `key`
instancji `Editor`, aby zmiana wybranego kontaktu resetowała draft i focusowała
logikę na nowej encji.

Nie synchronizuj inputa efektem.
