# Context i zdarzenia przez portal

Zaimplementuj `PortalAction`.

Komponent ma wyrenderować przycisk fizycznie do `container` przez portal. Przycisk
czyta nazwę workspace z `WorkspaceContext` i pokazuje `Otwórz {workspace}`.

Kliknięcie ma propagować się według drzewa React do wrappera komponentu, który
wywołuje `onInteraction`. Nie zatrzymuj propagacji na przycisku.
