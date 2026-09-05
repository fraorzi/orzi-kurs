# Spójna zmiana wielu wartości

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `FollowCard`.

Komponent pokazuje liczbę obserwujących i przycisk `Obserwuj` albo `Przestań
obserwować`. Kliknięcie ma natychmiast zmienić oba elementy:

- rozpoczęcie obserwowania zwiększa licznik o 1,
- zakończenie obserwowania zmniejsza licznik o 1.

Użyj jednego `useOptimistic` z reducerem aktualizującym oba pola atomowo. Po
zakończeniu `saveFollow` bazowy stan ma przyjąć dokładny wynik serwera.
