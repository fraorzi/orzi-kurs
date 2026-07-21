# Hints

## Hint 1

`fetchRows()` zwraca cały `RecordRow` — łącznie z `secret`, `status` i
`Date`. Zbuduj nowy obiekt tylko z pól, które klient smie zobaczyć
(`id`, `title`, `createdAt`), zamiast przekazywać wynik fetchera dalej bez
zmian.

## Hint 2

`Date` nie przechodzi przez granicę serwer→klient bez zmian — React wymaga
propsów serializowalnych. `toISOString()` daje string, który `JSON.stringify`
zapisze bez utraty informacji.

## Hint 3

Filtr działa tylko wtedy, gdy renderowana lista faktycznie zależy od stanu
`query` — samo podpięcie `onChange` do inputu nic nie zmienia w wyjściu,
jeśli `items.map(...)` w JSX dalej iteruje po pełnej, niefiltrowanej liście.
