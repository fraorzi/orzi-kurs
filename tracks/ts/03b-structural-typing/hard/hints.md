## Hint 1

Nie twórz klas ani adapterów pośrednich. Parametry już opisują minimalne możliwości.

## Hint 2

Prowadź licznik zarezerwowanych sztuk. Przy `false` zapisz zdarzenie i od razu zwróć
wariant `{ ok: false, failedSku }`.

## Hint 3

Po pętli zapisz zdarzenie sukcesu. Structural typing pozwala testom przekazać zwykły
obiekt albo klasę z dodatkowymi metodami.
