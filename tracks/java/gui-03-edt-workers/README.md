# EDT, worker i anulowanie

## Grupa

GUI

## Kiedy

Gdy kosztowna praca nie może blokować event dispatch thread, a aktualizacja komponentu musi wrócić na EDT.

## Pułapki

`Thread.sleep` w listenerze zamraża UI; modyfikacja Swing spoza EDT daje race condition, a executor bez shutdown zatrzymuje proces.

## Źródła

- [Java SE 25 desktop API](https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/module-summary.html)
- [PJATK GUI Dojo](https://dojo.pjwstk.edu.pl/pl/gui)
