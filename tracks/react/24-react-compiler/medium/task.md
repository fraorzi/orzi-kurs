# Stopniowa adopcja przez adnotację

Repozytorium migruje Compiler etapami z `compilationMode: "annotation"`.

Włącz kompilację wyłącznie dla `ModernInvoiceTable`, dodając dyrektywę
`"use memo"` we właściwym miejscu funkcji. `LegacyCounter` ma pozostać poza
kompilacją. Nie dodawaj ręcznego `useMemo`, `useCallback` ani `memo`.

Oba komponenty muszą zachować aktualne zachowanie i typowanie.

