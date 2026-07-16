# Warunkowe czytanie contextu przez `use`

Zaimplementuj `ThemeDetails`.

Gdy `showDetails` jest `false`, komponent ma pokazać `Szczegóły motywu ukryte`
bez czytania contextu. Gdy jest `true`, odczytaj `ThemeContext` i pokaż
`Aktywny motyw: {theme}`.

Odczyt ma być wykonany warunkowo przez `use(ThemeContext)`. Nie używaj warunkowego
`useContext`.
