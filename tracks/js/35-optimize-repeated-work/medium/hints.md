## Hint 1

`computeStyle(theme)` daje ten sam wynik dla każdego elementu, bo `theme` jest stałe
w obrębie wywołania. Policz go **raz** przed `map`, do zmiennej, i dokładaj tę samą wartość.

## Hint 2

```js
export function styleItems(items, theme, computeStyle) {
  const style = computeStyle(theme); // niezmiennik — poza pętlą
  return items.map((item) => ({ ...item, style }));
}
```

Wszystkie elementy współdzielą teraz jeden obiekt `style` — to bezpieczne, bo dane są
tylko do odczytu (nikt ich nie mutuje).
