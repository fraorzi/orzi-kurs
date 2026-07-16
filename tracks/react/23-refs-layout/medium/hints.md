## Hint 1

Zachowaj prywatny `textareaRef`, a ref otrzymany od rodzica przekaż do
`useImperativeHandle`.

## Hint 2

Metoda `selectAll` może wywołać natywne `textareaRef.current?.select()`; ta metoda
ustawia również focus.

## Hint 3

Rodzic tworzy `useRef<EditorHandle>(null)`. Nie potrzebujesz `forwardRef`.

