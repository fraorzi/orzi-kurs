# Popraw wyszukiwarkę sterowaną URL-em

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Formularz ma zachować bieżące parametry (np. `sort` i `stock`), ustawić lub usunąć
`query`, usunąć `page` i wykonać `router.replace` na bieżącej ścieżce. Nie używaj
`router.push` ani lokalnego stanu synchronizowanego efektem.
