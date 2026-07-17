# Ownership stanu i kompozycja komponentów

Dla każdego fragmentu stanu wybierz jedno źródło prawdy. Gdy dwa komponenty mają
zmieniać się razem, przenieś stan do ich najbliższego wspólnego rodzica i przekaż
wartość oraz handlery przez props.

Komponent sterowany otrzymuje ważny stan przez props. Komponent niesterowany
przechowuje go lokalnie. Sterowanie daje rodzicowi możliwość koordynacji, ale
wymaga jawniejszego API.

## Kompozycja przez `children`

Wrapper może udostępnić strukturę bez wiedzy o konkretnej zawartości:

```tsx
function Card({ children }: { children: ReactNode }) {
  return <section>{children}</section>;
}
```

`children` jest miejscem rozszerzenia API. Często jest czytelniejszy niż wiele
booleanów typu `showHeader`, `showIcon` i `showFooter`.

## Render props

Gdy rodzic ma współdzielić nie tylko miejsce, ale również zachowanie, może przyjąć
funkcję renderującą:

```tsx
<SelectionController>
  {({ item, isSelected, onSelect }) => (
    <button onClick={onSelect}>{item.name}</button>
  )}
</SelectionController>
```

Headless komponent zarządza stanem i semantyką, a konsument kontroluje markup.
Stan elementu listy przechowuj przez stabilne ID, nie indeks.

## Kiedy używać

- Lift state, gdy rodzeństwo musi być zsynchronizowane.
- `children` dla wrapperów wizualnych i miejsc na dowolny JSX.
- Render prop, gdy różne widoki mają współdzielić stanowe zachowanie.

## Kiedy unikać

- Nie podnoś każdego lokalnego toggle do korzenia aplikacji.
- Nie twórz render prop dla statycznego wrappera bez zachowania.
- Nie duplikuj kontrolowanego propsa w lokalnym stanie bez wyraźnej synchronizacji.

## Pułapki

- Dwa niezależne `useState` nie staną się automatycznie zsynchronizowane.
- Indeks listy nie jest stabilną tożsamością po reorderze.
- Nadmiernie szeroki render prop może ujawniać szczegóły implementacji.
- `children` jest nieprzezroczystą strukturą; nie zakładaj jego wewnętrznego drzewa.

## Źródła

- <https://react.dev/learn/sharing-state-between-components>
- <https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children>
- <https://react.dev/reference/react/Children>
