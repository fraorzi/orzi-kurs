# Hints

## Hint 1

Strażnik na wejściu: `event.model !== "article"` **lub** `action` spoza
`["publish", "unpublish"]` → zwróć `[]` od razu. Obie akcje mają dawać
ten sam zestaw tagów — nie sprawdzaj `action === "publish"` osobno.

## Hint 2

Tagi dokumentu i listy budujesz zawsze (`article:<documentId>`,
`articles:<locale>`); tag kategorii dokładasz **warunkowo** —
`event.category ? \`category:${event.category}:${event.locale}\` :
undefined`, nie interpoluj `category` wprost, gdy może być `undefined`.

## Hint 3

Zbierz wszystko do jednej tablicy (z ewentualnym `undefined` na miejscu
pominiętej kategorii), potem `.filter(Boolean)` usuwa puste/`undefined`
wpisy, a `new Set(...)` na wejściu do tablicy usuwa duplikaty.
