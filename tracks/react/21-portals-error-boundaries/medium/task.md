# Context i zdarzenia przez portal

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `PortalAction`.

Komponent ma wyrenderować przycisk fizycznie do `container` przez portal. Przycisk
czyta nazwę workspace z `WorkspaceContext` i pokazuje `Otwórz {workspace}`.

Kliknięcie ma propagować się według drzewa React do wrappera komponentu, który
wywołuje `onInteraction`. Nie zatrzymuj propagacji na przycisku.
