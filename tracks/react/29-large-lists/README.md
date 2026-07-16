# Duże listy: identity, windowing i react-window 2

Najpierw sprawdź, czy lista naprawdę jest problemem. Kilkadziesiąt prostych wierszy
często nie wymaga wirtualizacji; filtrowanie, paginacja albo ograniczenie danych
może być lepszym UX niż przewijanie miliona rekordów. Windowing ma sens, gdy duża
liczba elementów DOM i ich render rzeczywiście obciążają interakcje.

## Identity przed wydajnością

Stabilny `key` identyfikuje rekord między sortowaniem, filtrowaniem i dopisywaniem.
Indeks listy może przypisać lokalny stan, focus lub animację do innego rekordu.
Memoizacja wiersza także wymaga stabilnych propsów i poprawnej identity.

## Matematyka okna

Dla stałej wysokości wiersza zakres wynika z `scrollTop`, wysokości viewportu i
`rowHeight`. Renderuje się wyłącznie elementy przecinające viewport oraz niewielki
`overscan` przed i za nim. Wewnętrzny spacer zachowuje pełną wysokość scrolla, a
widoczne wiersze są pozycjonowane na `index * rowHeight`.

Overscan ogranicza migotanie podczas szybkiego przewijania, ale zbyt duży odbiera
korzyść z wirtualizacji. Zmienne wysokości wymagają pomiaru/cache'u i są droższe.

## `react-window` 2.x

Aktualne API używa `List`, `rowComponent`, `rowCount`, `rowHeight` i `rowProps`.
To nie jest historyczne API `FixedSizeList` z wersji 1.x. Row otrzymuje `index`,
`style` oraz `ariaAttributes`; styl pozycjonujący musi trafić do jego elementu.
Biblioteka udostępnia również imperative ref do przewinięcia konkretnego wiersza.

## Kiedy używać

- Stabilne ID zawsze, gdy rekordy mogą zmienić kolejność.
- Ręczne fixed-size windowing, gdy przypadek jest prosty i potrzebujesz pełnej
  kontroli nad semantyką.
- Sprawdzoną bibliotekę dla produkcyjnych list, gridów i zmiennych wysokości.

## Pułapki

- Wirtualizacja zmniejsza DOM, ale nie ogranicza automatycznie ilości pobranych danych.
- Indeks jako key psuje identity po reorderze.
- Pominięcie przekazanego `style` nakłada wiersze w jednym miejscu.
- Inline `rowProps` może wymuszać aktualizacje wierszy.
- Windowing komplikuje wyszukiwanie w stronie, pomiar, focus i automatyczne testy.
- Stare tutoriale `FixedSizeList` dotyczą react-window 1.x, nie obecnego 2.x.

## Źródła

- <https://github.com/bvaughn/react-window>
- <https://react-window.vercel.app/>
- <https://web.dev/articles/virtualize-long-lists-react-window>
- <https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key>
- <https://react.dev/reference/react/memo>
