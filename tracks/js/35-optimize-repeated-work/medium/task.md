# Medium [O] - wyciągnij niezmiennik z pętli

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`styleItems(items, theme, computeStyle)` zwraca kopie elementów z doklejonym stylem
policzonym z motywu: `computeStyle(theme)` (funkcja kosztowna, zależna **tylko** od `theme`).

Kod jest **poprawny**, ale liczy `computeStyle(theme)` dla **każdego** elementu - choć
`theme` się nie zmienia. Bramka liczy wywołania `computeStyle`: ma być **jedno**, nie
`items.length`. Wyciągnij obliczenie przed pętlę, nie zmieniając wyniku.

```js
const computeStyle = (theme) => ({ color: theme });
styleItems([{ id: 1 }, { id: 2 }], "dark", computeStyle);
// [{ id: 1, style: { color: "dark" } }, { id: 2, style: { color: "dark" } }]
// computeStyle wołane 1 raz, nie 2
```
