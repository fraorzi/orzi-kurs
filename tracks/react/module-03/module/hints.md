## Hint 1

Fabryka klucza może zwracać `[...ticketKeys.all, "list", { status }] as const`.

## Hint 2

Do roving tabindex wystarczy tablica refów. Po wyliczeniu sąsiedniego indeksu
wywołaj `onChange`, a potem `focus()` na odpowiednim przycisku.

## Hint 3

Wąski typ stylu łączy `CSSProperties` z `{ "--priority-accent": string }`.

## Hint 4

Dialog zapamiętuje trigger przekazany z `event.currentTarget`. Cleanup efektu może
przywrócić na niego fokus.

## Hint 5

Wynik `onMutate` powinien zawierać zarówno snapshot, jak i dokładny query key użyty
przez operację. Dzięki temu rollback nie zależy od późniejszej zmiany filtra.

## Hint 6

Invalidacja w `onSettled` używa prefiksu `ticketKeys.all`, nie tylko aktualnej listy.
