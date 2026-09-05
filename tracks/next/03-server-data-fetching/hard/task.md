# Zaplanuj częściowo zależny graf danych

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Strona workspace potrzebuje użytkownika, feature flags i ostatnich zamówień.
Feature flags są niezależne, ale zamówienia wymagają `user.id`.

Przepisz `loadWorkspace`, aby:

- użytkownik i feature flags zaczynały pobieranie od razu,
- zamówienia zaczynały się dopiero po poznaniu `user.id`,
- funkcja czekała na flags i zamówienia współbieżnie, jeśli flags nadal trwają,
- wynik zachował typ `WorkspaceData`.

Nie zmieniaj interfejsu `WorkspaceServices` ani komponentu strony.
