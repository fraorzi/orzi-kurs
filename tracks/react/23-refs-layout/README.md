# Refy, uchwyty imperatywne i pomiar layoutu

Ref pozwala zachować wartość między renderami bez wywoływania kolejnego renderu
albo dotknąć API przeglądarki po commicie. Najczęstsze poprawne zastosowania to
focus, zaznaczenie tekstu, scroll, animacja oraz pomiar elementu.

## `ref` jako prop w React 19

Od React 19 komponent funkcyjny może przyjąć `ref` jak zwykły prop. Gdy rodzic ma
otrzymać konkretny element DOM, komponent przekazuje ten ref dalej do elementu.
`forwardRef` pozostaje potrzebny przy zgodności ze starszym Reactem, ale nie jest
potrzebny w nowych komponentach tej ścieżki.

## Ograniczony interfejs przez `useImperativeHandle`

Przekazanie całego elementu DOM daje rodzicowi więcej możliwości niż zwykle
potrzebuje. `useImperativeHandle` pozwala wystawić mały, typowany kontrakt, np.
`focus()` i `selectAll()`, pozostawiając wewnętrzny DOM prywatny.

Zachowanie deklaratywne nadal powinno być prope'em. Modal powinien zwykle dostać
`isOpen`, zamiast wystawiać metody `open()` i `close()`.

## `useLayoutEffect`

`useLayoutEffect` wykonuje się po umieszczeniu DOM, ale przed repaintem. Pozwala
zmierzyć element i wykonać drugi render tak, aby użytkownik nie zobaczył złej
pozycji tooltipa. Kod i aktualizacje stanu w tym hooku blokują repaint, dlatego
zwykły `useEffect` pozostaje domyślnym wyborem dla synchronizacji niepowiązanej z
pomiarem widocznego layoutu.

## Kiedy używać

- Ref do focusu, zaznaczenia, scrolla albo integracji z imperatywnym API.
- `useImperativeHandle`, gdy biblioteczny komponent powinien wystawić kilka
  bezpiecznych operacji, ale nie cały DOM.
- `useLayoutEffect`, gdy wynik pomiaru musi zmienić układ przed repaintem.

## Pułapki

- Odczyt lub zapis `ref.current` podczas renderowania łamie czystość komponentu.
- Zmiana refa nie wywołuje renderu; dane widoczne w JSX należą zwykle do stanu.
- Nadmierny interfejs imperatywny zwiększa sprzężenie rodzica z implementacją.
- Zależności `useImperativeHandle` muszą obejmować reaktywne wartości uchwytu.
- `useLayoutEffect` blokuje repaint i nie działa podczas renderowania serwerowego.
- Strict Mode wykonuje dodatkowy cykl setup/cleanup Effectów w development.

## Źródła

- <https://react.dev/reference/react/useRef>
- <https://react.dev/reference/react/useImperativeHandle>
- <https://react.dev/reference/react/useLayoutEffect>
- <https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop>

