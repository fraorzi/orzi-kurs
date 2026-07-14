export function createHistory(initial) {
  // TODO: historia stanów dla undo/redo. Trzymaj trzy rzeczy w domknięciu:
  //   past (stos poprzednich), present (bieżący), future (stos cofniętych).
  // Zwróć { present, canUndo, canRedo, push, undo, redo }:
  //  - present (getter) — bieżący stan
  //  - canUndo / canRedo (gettery) — czy past / future ma elementy
  //  - push(next): odłóż present na past, ustaw present = next, WYCZYŚĆ future
  //    (nowa zmiana kasuje możliwość redo)
  //  - undo(): jeśli past pusty → zwróć present bez zmian; inaczej przenieś present
  //    na future, zdejmij ostatni z past jako present, zwróć nowy present
  //  - redo(): symetrycznie względem undo (future ↔ past)
}
