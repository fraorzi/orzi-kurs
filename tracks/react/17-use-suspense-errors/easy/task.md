# Warunkowe czytanie contextu przez `use`

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `ThemeDetails`.

Gdy `showDetails` jest `false`, komponent ma pokazać `Szczegóły motywu ukryte`
bez czytania contextu. Gdy jest `true`, odczytaj `ThemeContext` i pokaż
`Aktywny motyw: {theme}`.

Odczyt ma być wykonany warunkowo przez `use(ThemeContext)`. Nie używaj warunkowego
`useContext`.
