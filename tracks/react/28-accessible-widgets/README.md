# Dostępne widgety: klawiatura, focus i komunikaty

Semantyka ARIA nie dodaje zachowania. Jeśli tworzysz własny widget zamiast użyć
natywnego elementu, odpowiadasz także za oczekiwane klawisze, kolejność focusu,
stan zaznaczenia oraz relacje między kontrolką i treścią.

## Focus i wybór to różne stany

W złożonym widżecie Tab zwykle wprowadza focus do jednej aktywnej kontrolki, a
strzałki poruszają go wewnątrz grupy. Roving `tabIndex` utrzymuje dokładnie jeden
element z `tabIndex=0`, pozostałe mają `-1`. W tabs z ręczną aktywacją strzałka
zmienia focus, lecz dopiero Enter lub Space zmienia wybrany panel.

Focus musi pozostać widoczny i lądować przewidywalnie po usunięciu elementu,
zamknięciu dialogu lub błędzie. Nie usuwaj outline bez równoważnego wskaźnika.

## Live regions

`role="status"` służy do niepilnych aktualizacji, np. zakończenia zapisu.
`role="alert"` jest asertywny i pasuje do ważnego błędu. Dynamiczny komunikat ma
zostać ogłoszony bez przenoszenia focusu i bez przerywania bieżącego zadania.
Alert nie powinien automatycznie znikać, zanim użytkownik zdoła go odczytać.

## Modal

Modal ma `role="dialog"`, `aria-modal="true"` i dostępną nazwę. Po otwarciu focus
przenosi się do środka, Tab i Shift+Tab pozostają w dialogu, Escape zamyka, a po
zamknięciu focus zwykle wraca do triggera. Dla nieodwracalnej akcji dobrym
początkowym focusem jest najmniej destrukcyjna opcja.

## Kiedy używać

- Live region do komunikatu, który pojawia się bez zmiany focusu.
- Roving focus w composite widgets zgodnych z konkretnym wzorcem APG.
- Modal tylko wtedy, gdy reszta interfejsu rzeczywiście jest niedostępna do czasu
  zamknięcia okna.

## Pułapki

- `aria-modal="true"` bez faktycznie modalnego zachowania szkodzi użytkownikom AT.
- Dodatni `tabIndex` tworzy nieprzewidywalną kolejność i jest odradzany.
- Strzałki w horizontal tablist nie powinny przejmować ArrowUp/ArrowDown.
- Automatyczna aktywacja tabs z wolnym panelem utrudnia nawigację.
- Sam `role="button"` na `div` nie dodaje Enter, Space ani focusu.
- Alert nie jest dialogiem potwierdzenia i nie powinien kraść focusu.

## Źródła

- <https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/tabs/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/alert/>
- <https://react.dev/reference/react-dom/createPortal>
