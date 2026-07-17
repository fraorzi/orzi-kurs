## Hint 1

Format waliduj regexem par hex: `/^(?:[0-9a-f]{2})+$/i` — łapie od razu
nieparzystą długość i złe znaki (pusty string też ma nie przejść).

## Hint 2

`Buffer.from(hex, "hex")` po walidacji; różnicę długości buforów zwróć jako
`false` zanim dotkniesz `timingSafeEqual`.

## Hint 3

Dopiero ostatnia linia to `return timingSafeEqual(left, right)` — cała reszta
zadania to doprowadzenie do stanu, w którym wolno je wywołać.
