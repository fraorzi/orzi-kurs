## Hint 1

Kontrakt to lista dopuszczonych ról: `["editor", "admin"]`. Wszystko poza
tą listą — łącznie z brakiem `user` — to `false`.

## Hint 2

`user?.role === "editor" || user?.role === "admin"` obsługuje jednym
wyrażeniem zarówno brak `user`, jak i brak `role`.

## Hint 3

Nie porównuj przez `Boolean(user)` ani `user?.role !== undefined` — to
przepuści dowolną rolę, np. `"public"`, zamiast tylko dwóch dozwolonych.
