## Hint 1

Potrzebujesz osobnych refów do przycisku i elementu z `role="tooltip"`.

## Hint 2

W `useLayoutEffect` zakończ wcześnie, jeśli tooltip jest zamknięty albo któryś
element jeszcze nie istnieje.

## Hint 3

Wolne miejsce pod przyciskiem to `window.innerHeight - anchor.bottom`. Po zmianie
`label` rozmiar tooltipa może być inny, więc dodaj tę wartość do zależności.

