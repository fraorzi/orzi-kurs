# Zachowaj draft rekordu po zmianie kolejności

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Napraw `EditableQueue`.

Każdy rekord ma lokalne pole `Notatka dla {title}`. Kliknięcie `Odwróć kolejność`
zmienia kolejność rekordów. Wpisana notatka ma pozostać przypisana do tego samego
`id`, a nie do tej samej pozycji na ekranie.

Nie podnoś wszystkich draftów do rodzica. Napraw identity wierszy stabilnym key.
