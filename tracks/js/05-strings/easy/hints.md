## Hint 1

`ucFirst`: pierwszy znak przez `str[0]` lub `charAt(0)`, reszta przez
`slice(1)`, sklej. `checkSpam`: sprowadź string do jednej wielkości liter
i sprawdź `includes` dla obu słów. `initials`: split → filter → map → join.

## Hint 2

`ucFirst("")`: `str[0]` to undefined — najprościej zacząć od
`if (!str) return str`. `initials`: `fullName.split(" ").filter(Boolean)`
usuwa puste stringi po wielokrotnych spacjach; potem
`.map((w) => w[0].toUpperCase()).join("")`.
