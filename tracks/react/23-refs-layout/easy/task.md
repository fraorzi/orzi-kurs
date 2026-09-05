# Focus przez `ref` jako prop

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SearchField` i `CommandPalette` dla React 19.

Kliknięcie przycisku `Przejdź do wyszukiwania` ma ustawić focus w polu
`Szukaj polecenia`. `SearchField` powinien przyjąć typowany `ref` jako zwykły prop
i przekazać go do wewnętrznego inputu.

Nie używaj `forwardRef` ani selektorów DOM.
