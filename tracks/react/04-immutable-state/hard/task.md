# Przenoszenie zadania na tablicy sprintu

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

Zaimplementuj `SprintBoard`.

Komponent otrzymuje `initialBoard` z tablicami `backlog` i `inProgress`. Każde
zadanie z backlogu ma przycisk `Rozpocznij {tytuł}`. Kliknięcie usuwa zadanie
z backlogu i dopisuje je na końcu kolumny `W toku`.

Nie mutuj `initialBoard`, żadnej z jego tablic ani bieżącego snapshotu stanu.
Rozwiązanie ma działać również wtedy, gdy dane wejściowe są zamrożone.
