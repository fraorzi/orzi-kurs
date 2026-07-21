## Hint 1

Strapi 5 nie ma warstwy `attributes` — `title` leży bezpośrednio na
elemencie `data`, nie pod `item.attributes.title`.

## Hint 2

To pojedynczy `response.data.map(...)` — nie potrzebujesz `?.` do
`attributes`, bo tego klucza w ogóle nie ma w typie odpowiedzi v5.

## Hint 3

Test HTTP parsuje realny `Response.json()` z efemerycznego serwera —
upewnij się, że `solve` działa na już sparsowanym obiekcie JS, nie na
surowym `Response`.
