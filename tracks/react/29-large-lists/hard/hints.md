## Hint 1

Zaimportuj `List` oraz typ `RowComponentProps` z `react-window`.

## Hint 2

`CustomerRow` odczytuje rekord jako `customers[index]`, a następnie renderuje root
`<div style={style} {...ariaAttributes}>`.

## Hint 3

Przekaż `rowProps={useMemo(() => ({ customers, onOpen }), [customers, onOpen])}`.
Biblioteka dołączy do tych propsów `index`, `style` i `ariaAttributes`.
