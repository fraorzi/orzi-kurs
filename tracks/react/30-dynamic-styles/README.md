# Dynamiczne style: klasy, wartości runtime i CSS custom properties

React przekazuje statyczne klasy przez `className`, a atrybut `style` przyjmuje
obiekt z nazwami właściwości zapisanymi camelCase. Liczby dla większości
właściwości otrzymują jednostkę `px`; wartości procentowe, kolory i inne jednostki
warto przekazywać jawnie jako string.

## Statyczne kontra dynamiczne

Stały wygląd komponentu powinien mieszkać w CSS i być wybierany klasą. Inline style
jest przydatny, gdy konkretna wartość powstaje dopiero w runtime: szerokość paska,
pozycja kursora, kolor wybrany przez użytkownika albo liczba przekazana do wykresu.
Nie warto przepisywać całego arkusza do obiektu tylko dlatego, że jedna wartość jest
dynamiczna.

## CSS custom properties jako granica

Custom property, na przykład `--chart-accent`, pozwala przekazać dynamiczny token
na korzeń komponentu, a jego potomkowie mogą używać go w zwykłym CSS przez
`var(--chart-accent)`. Dzięki temu React odpowiada za dane, a arkusz za selektory,
stany, media queries i kompozycję wizualną.

`CSSProperties` celowo nie dopuszcza dowolnych nazw. W TypeScript warto zdefiniować
wąski typ zawierający wyłącznie custom properties obsługiwane przez komponent,
zamiast wyłączać typowanie całego obiektu.

## Kiedy używać

- `className` dla stałych reguł, wariantów i stanów opisanych w CSS.
- `style` dla pojedynczych wartości wyliczanych w runtime.
- Typowanych CSS custom properties, gdy dynamiczne dane mają być konsumowane przez
  kilka selektorów lub zagnieżdżonych elementów.
- Osobnej biblioteki stylowania tylko wtedy, gdy rozwiązuje problem projektu, a nie
  jako domyślną warstwę dla każdego komponentu.

## Pułapki

- `style="width: 50%"` jest niepoprawne w React; potrzebny jest obiekt.
- `background-color` w obiekcie powinno być zapisane jako `backgroundColor`.
- Goła liczba przy `width` oznacza piksele, nie procenty.
- Duże warunkowe obiekty inline mieszają dane, warianty i reguły responsywne.
- Rzutowanie na ogólne `Record<string, unknown>` ukrywa literówki w nazwach tokenów.
- Inline style nie zastępuje semantyki, nazw dostępnych ani kontrastu kolorów.

## Źródła

- <https://react.dev/reference/react-dom/components/common#applying-css-styles>
- <https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties>
- <https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style>
