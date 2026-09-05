# Headless selection przez render prop

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw generyczny `SelectionController` oraz `MemberPicker`.

`SelectionController` otrzymuje `items`, `getId` i render prop `children`.
Render prop ma dla każdego elementu dostać `item`, `isSelected` i `onSelect`.

Wybór przechowuj przez stabilne ID. Po zmianie kolejności `items` wybrany członek
ma pozostać ten sam. `MemberPicker` renderuje przyciski z dopiskiem `(wybrano)` przy aktywnej osobie.
