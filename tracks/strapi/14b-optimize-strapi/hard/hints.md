## Hint 1

Starter ma komplet precyzyjnych tagów, ale dokłada globalny `content` —
to on wywraca cały cache.

## Hint 2

Usuń `"content"` z listy; zostają `article:<id>`, `articles:<locale>`
i warunkowy tag kategorii.

## Hint 3

Tag kategorii buduj tylko gdy `category` podane; `.filter(Boolean)` usuwa
pusty string, gdy kategorii brak.
