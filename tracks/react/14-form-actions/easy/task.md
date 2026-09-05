# Wyszukiwanie przez `form action`

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SearchActionForm`.

Formularz ma pole `Fraza` i przycisk `Szukaj`. Funkcja przekazana w propsie
`search` ma otrzymać przyciętą frazę. Dla pustej frazy nie wywołuj `search`.

Użyj funkcyjnego `action`, a nie `onSubmit`. Po udanym zakończeniu wyszukiwania
niekontrolowane pole powinno zostać automatycznie wyczyszczone przez React.
