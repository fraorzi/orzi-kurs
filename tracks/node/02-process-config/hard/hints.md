## Hint 1

`Object.entries(env)` → filtr → map → `Object.fromEntries(...)`. Filtr usuwa
pary z `undefined` (i przy okazji zawęża typ wartości do `string`).

## Hint 2

Wrażliwość klucza sprawdza jeden regex z flagą `i`:
`/token|secret|password|key/i.test(key)`.

## Hint 3

`Object.fromEntries` już tworzy nowy obiekt — uważaj tylko, żeby nie zwrócić
gdzieś oryginalnej referencji.
