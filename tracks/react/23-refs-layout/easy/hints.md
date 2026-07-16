## Hint 1

Typ prop-a może być zapisany jako `ref?: Ref<HTMLInputElement>`.

## Hint 2

W `CommandPalette` utwórz `useRef<HTMLInputElement>(null)` i wywołaj
`inputRef.current?.focus()` w handlerze przycisku.

## Hint 3

W React 19 zwykłe `function SearchField({ ref })` może przekazać ten ref do
`<input ref={ref}>`.

