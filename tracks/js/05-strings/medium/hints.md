## Hint 1

`truncate`: jeden warunek długości; pamiętaj, że `"…"` zajmuje 1 znak z limitu.
`camelize`: idiom split → map → join z README — pierwszy element bez zmian,
reszta z wielkiej litery. `maskCard`: weź ostatnie 4 znaki i dopchnij gwiazdkami
do pełnej długości.

## Hint 2

`truncate`: `str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str`.
`camelize`: `.map((word, i) => (i === 0 ? word : word[0].toUpperCase() +
word.slice(1)))` — dla wiodącego myślnika pierwszy element to `""` i to jest OK.
`maskCard`: `cardNumber.slice(-4).padStart(cardNumber.length, "*")`.
