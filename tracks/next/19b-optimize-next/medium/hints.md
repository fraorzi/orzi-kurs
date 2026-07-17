## Hint 1

Obie operacje są niezależne, więc ich Promise mogą powstać w tym samym ticku.

## Hint 2

`const [revenue, orders] = await Promise.all([...])` zachowuje typy i kolejność wyniku.
