# Stopniowa adopcja przez adnotację

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Repozytorium migruje Compiler etapami z `compilationMode: "annotation"`.

Włącz kompilację wyłącznie dla `ModernInvoiceTable`, dodając dyrektywę
`"use memo"` we właściwym miejscu funkcji. `LegacyCounter` ma pozostać poza
kompilacją. Nie dodawaj ręcznego `useMemo`, `useCallback` ani `memo`.

Oba komponenty muszą zachować aktualne zachowanie i typowanie.
