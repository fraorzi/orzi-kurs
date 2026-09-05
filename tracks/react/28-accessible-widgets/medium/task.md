# Przełączanie zakładek klawiaturą

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

Zakładki `Profil`, `Bezpieczeństwo` i `Powiadomienia`, ich HTML oraz kliknięcia są gotowe.
Uzupełnij `handleKeyDown` w `SettingsTabs`.

- `ArrowRight` przenosi focus do następnego przycisku, a z ostatniego do pierwszego.
- `ArrowLeft` działa w przeciwnym kierunku, również z przejściem między końcami listy.
- Strzałki zmieniają tylko focus. Widoczna treść panelu pozostaje bez zmian.
- `Enter`, spacja lub kliknięcie wybierają zakładkę, na której jest focus.
- Przycisk wskazany strzałkami ma `tabIndex=0`, pozostałe mają `-1`.

Przykład: na `Profil` naciśnij `ArrowRight`. Focus ma przejść na `Bezpieczeństwo`,
ale nadal widać `Dane profilu`. Dopiero `Enter` pokazuje `Ustawienia hasła`.
