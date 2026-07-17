# Headless selection przez render prop

Zaimplementuj generyczny `SelectionController` oraz `MemberPicker`.

`SelectionController` otrzymuje `items`, `getId` i render prop `children`.
Render prop ma dla każdego elementu dostać `item`, `isSelected` i `onSelect`.

Wybór przechowuj przez stabilne ID. Po zmianie kolejności `items` wybrany członek
ma pozostać ten sam. `MemberPicker` renderuje przyciski z `aria-pressed` oraz
dopiskiem `(wybrano)` przy aktywnej osobie.
