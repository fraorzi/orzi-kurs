# Focus w oknie potwierdzenia usunięcia

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

`DeleteAccountDialog` ma gotowy HTML, portal i przyciski.
Uzupełnij efekt zarządzający focusem i funkcję `handleKeyDown`.

- Po otwarciu okna przyciskiem `Usuń konto` focus trafia na `Anuluj`.
- `Tab` na ostatnim przycisku wraca do pierwszego.
- `Shift+Tab` na pierwszym przycisku przechodzi do ostatniego.
- `Escape` zamyka okno.
- Po zamknięciu focus wraca do przycisku `Usuń konto`.

Zachowaj gotowe działania: `Anuluj` zamyka okno, a `Potwierdź usunięcie`
wywołuje `onConfirm` i zamyka okno.
