# Hard — rozwiąż warunkowy export

Budujesz walidator pakietu, który symuluje wybór targetu z mapy `"exports"`
`package.json`, zanim pakiet trafi do rejestru.

`solve(map, conditions)`:

- przejdź warunki środowiska w kolejności podanej w `conditions` i zwróć wartość
  pierwszego, który występuje w `map`;
- gdy żaden nie pasuje, użyj `map.default`;
- gdy nie ma też `"default"`, rzuć `Error` — pakiet z taką mapą wywali się w
  runtime błędem `ERR_PACKAGE_PATH_NOT_EXPORTED`, walidator ma to wykryć wcześniej.

```ts
solve({ node: "./dist/node.js", default: "./dist/index.js" }, ["node", "import"]);
// "./dist/node.js"
```
