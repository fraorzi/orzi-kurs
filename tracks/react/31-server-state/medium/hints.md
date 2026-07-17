## Hint 1

`queryFn: ({ signal }) => fetchIssues(signal)` łączy request z cache'em.

## Hint 2

Klient z `useQueryClient()` jest stabilnym wejściem do invalidacji.

## Hint 3

Filtr invalidacji ma postać `{ queryKey: ["issues"] }`.

## Hint 4

Callback `onSuccess` powinien zwrócić wynik `invalidateQueries`, nie blok z
pominiętym `return`.
