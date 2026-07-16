## Hint 1

Po `await fetcher(url)` sprawdź `response.ok` przed wywołaniem `json()`.

## Hint 2

Napisz mały type guard lub parser, który zaczyna od `typeof value === "object" &&
value !== null`.

## Hint 3

Po sprawdzeniu, że JSON jest tablicą, użyj `.map(parseProduct)`. Parser może
rzucić `Error` dla pierwszego błędnego elementu.
