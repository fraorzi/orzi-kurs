# Swing: model, zdarzenia i renderowanie

## Grupa

GUI

## Kiedy

Gdy JFrame ma cienki widok, model listy emituje zdarzenia, a akcja nie miesza logiki domenowej z repaint.

## Pułapki

Nadpisanie `paint` zamiast `paintComponent`, brak `super` i logika w listenerze prowadzą do artefaktów i trudnych testów.

## Źródła

- [Java SE 25 desktop API](https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/module-summary.html)
- [PJATK GUI Dojo](https://dojo.pjwstk.edu.pl/pl/gui)
