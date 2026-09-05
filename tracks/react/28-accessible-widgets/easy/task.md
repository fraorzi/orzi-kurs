# Pokaż wynik zapisu bez przenoszenia focusu

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SaveSettings`.

Po kliknięciu `Zapisz ustawienia` wywołaj przekazane `save()`:

- podczas oczekiwania przycisk jest disabled i ma tekst `Zapisywanie…`,
- po sukcesie pokaż niepilny komunikat `Ustawienia zapisane`,
- po błędzie pokaż `Nie udało się zapisać`,
- komunikaty nie mogą przejmować focusu; po zakończeniu focus pozostaje na
  ponownie aktywnym przycisku.
