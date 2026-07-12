## Hint 1

`filterRange` → `filter`. `sortByAge` → sortowanie z komparatorem `(a, b) => a.age - b.age`,
ale pamiętaj: `sort` mutuje. `unique` → `filter` z `indexOf` albo `Set`. `groupById` → `reduce`.

## Hint 2

Nie-mutujące sortowanie: `users.toSorted(cmp)` albo `[...users].sort(cmp)`.
`unique` przez Set: `[...new Set(arr)]` — zachowuje kolejność pierwszych wystąpień.

## Hint 3

`groupById`: `users.reduce((acc, user) => { acc[user.id] = user; return acc; }, {})`.
InitialValue `{}` jest konieczne — bez niego pusta tablica rzuci TypeError.
