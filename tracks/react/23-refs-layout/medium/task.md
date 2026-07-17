# Minimalny uchwyt edytora

Zaimplementuj `NoteEditor` oraz `EditorPanel`.

`NoteEditor` przyjmuje w React 19 prop `ref` typu `Ref<EditorHandle>`. Użyj
`useImperativeHandle`, aby wystawić dokładnie dwie operacje:

- `focus()` — ustawia focus na textarea,
- `selectAll()` — ustawia focus i zaznacza całą treść textarea.

Nie ujawniaj rodzicowi elementu DOM. W `EditorPanel` przycisk `Zaznacz notatkę`
ma wywołać metodę `selectAll()`.

