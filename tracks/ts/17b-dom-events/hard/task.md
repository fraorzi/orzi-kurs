# Hard - delegowany handler akcji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `createActionHandler(onAction)`.

Kontener zawiera elementy z:

```html
<button data-action="edit" data-id="42"><span>Edytuj</span></button>
```

Obsługiwane akcje: `"edit" | "delete" | "archive"`.

Handler:

- zaczyna od `event.target` i `event.currentTarget`,
- znajduje najbliższy `[data-action]`,
- ignoruje element spoza bieżącego kontenera,
- ignoruje disabled button, nieznaną akcję i pusty id,
- wywołuje callback z `{ action, id }`,
- działa także po kliknięciu zagnieżdżonego `span`.
