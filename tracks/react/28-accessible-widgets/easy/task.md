# Ogłoś wynik zapisu bez przenoszenia focusu

Zaimplementuj `SaveSettings`.

Po kliknięciu `Zapisz ustawienia` wywołaj przekazane `save()`:

- podczas oczekiwania przycisk jest disabled i ma tekst `Zapisywanie…`,
- po sukcesie pokaż niepilny komunikat `Ustawienia zapisane` przez `role="status"`,
- po błędzie pokaż `Nie udało się zapisać` przez `role="alert"`,
- komunikaty nie mogą przejmować focusu; po zakończeniu focus pozostaje na
  ponownie aktywnym przycisku.
