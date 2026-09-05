# Kompozycja zamiast renderowania raportu przez stan wrappera

Tryb: optymalizacja. Popraw istniejący kod w `starter.tsx`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`AnalyticsPage` jest poprawny, ale Profiler wykazał commit raportu przy każdym
otwarciu i zamknięciu lokalnych filtrów.

Wyodrębnij wrapper będący właścicielem `expanded` i przekaż raport jako `children`.
Zmiana stanu wrappera nie może renderować raportu. Nie używaj `memo`, `useMemo` ani
`useCallback`.

Zachowaj przycisk, komunikat `Filtry aktywne` i publiczne propsy komponentu.
