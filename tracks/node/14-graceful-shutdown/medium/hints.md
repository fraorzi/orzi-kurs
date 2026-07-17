## Hint 1

Stan: `let active = 0` i `Set` funkcji budzących czekających na dren.
`leave` z flagą `left` w domknięciu daje idempotencję.

## Hint 2

Po każdej dekrementacji sprawdź `active === 0` i obudź wszystkich
czekających, czyszcząc zbiór.

## Hint 3

W `drain`: jeżeli `active === 0`, `Promise.resolve()`; inaczej promise,
który rejestruje budzik w zbiorze i `signal.addEventListener("abort", ...,
{ once: true })` — abort usuwa budzik i odrzuca `signal.reason`.
