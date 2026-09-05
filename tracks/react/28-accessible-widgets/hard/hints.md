## Hint 1

Zachowaj refy triggera, przycisku anulowania i potwierdzenia. Effect po otwarciu
ustawia focus na anulowaniu, a cleanup przy zamknięciu przywraca trigger.

## Hint 2

Handler `onKeyDown` dialogu obsługuje Escape oraz Tab na granicach listy dwóch
focusowalnych elementów. Dla zawijania użyj `preventDefault()` i `.focus()`.

## Hint 3

Portal i nagłówek są gotowe. Przy zamknięciu okna użyj refa przycisku, który je otworzył.
