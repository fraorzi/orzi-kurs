# Panel kompozycyjny

Zaimplementuj `Panel`, który przyjmuje:

- `title: string`,
- `children: ReactNode`,
- opcjonalny `tone: "info" | "warning"` z domyślną wartością `"info"`.

Wyrenderuj `section` z `data-tone` i nazwą dostępną równą `title`, nagłówek
poziomu 2 oraz przekazane `children`.
Nie zamieniaj `children` na tekst ani własny zestaw propsów.
