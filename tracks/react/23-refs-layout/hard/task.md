# Tooltip mierzony przed repaintem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `AdaptiveTooltip`.

Kliknięcie przycisku otwiera tooltip. Po otwarciu zmierz `getBoundingClientRect()`
przycisku i tooltipa. Gdy pod przyciskiem nie mieści się cały tooltip, ale mieści
się nad nim, ustaw `data-placement="top"`; w pozostałych przypadkach użyj
`data-placement="bottom"`.

Pomiar wpływa na pierwszy widoczny układ, dlatego musi wykonać się w
`useLayoutEffect`, przed repaintem. Powtórz go po zmianie treści `label`.
