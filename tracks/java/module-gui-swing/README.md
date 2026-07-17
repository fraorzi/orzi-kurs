# Moduł Swing: edytor z undo i zapisem

## Grupa

GUI

## Kiedy

Gdy desktopowy edytor potrzebuje modelu, Command/undo i bezpiecznego eksportu bez logiki w komponentach.

## Pułapki

Undo bez snapshotu przy mutowalnym stanie nie odtworzy wartości; zapis musi mieć jawne kodowanie i atomową zamianę.

## Źródła

- [Java SE 25 desktop API](https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/module-summary.html)
- [PJATK GUI Dojo](https://dojo.pjwstk.edu.pl/pl/gui)
