## Hint 1

Walidacja najpierw: `Number.isInteger(bytes) && bytes >= 16`, inaczej `throw`.

## Hint 2

`randomBytes(bytes)` zwraca Buffer; format daje
`.toString("base64url")` — to wbudowane kodowanie, nie ręczna zamiana znaków.

## Hint 3

Jeżeli w rozwiązaniu jest `Math.random`, to nie jest token bezpieczeństwa —
CSPRNG to jedyna akceptowalna losowość w tym temacie.
