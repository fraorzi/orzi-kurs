# Toast renderowany do osobnej warstwy DOM

Tryb: uzupełnienie. W `starter.tsx` jest punkt wyjścia. Dopisz brakujące zachowanie opisane poniżej.

Zaimplementuj `ToastPortal`.

Komponent otrzymuje `container` i `message`. Ma wyrenderować komunikat z rolą
`status` fizycznie wewnątrz przekazanego kontenera przez `createPortal`.

Nie twórz nowego roota i nie renderuj toastu inline obok komponentu wywołującego.
