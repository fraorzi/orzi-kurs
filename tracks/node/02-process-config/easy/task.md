# Easy - parsuj jawne argumenty CLI

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Narzędzie startowe usługi przyjmuje trzy opcje. Zaimplementuj
`solve(argv)` (argv bez `node` i nazwy skryptu):

- `--port 3000` - wartość w następnym elemencie; domyślnie `3000`;
  liczba całkowita w zakresie 1-65535, inaczej `Error`;
- `--host=0.0.0.0` - wartość po `=`; domyślnie `"127.0.0.1"`;
- `--json` - flaga boolean, domyślnie `false`;
- każdy inny argument to `Error` z nazwą nieznanego argumentu - literówka we
  fladze ma być błędem startu, nie cichym zignorowaniem.

```ts
solve(["--port", "8080", "--json"]);
// { port: 8080, host: "127.0.0.1", json: true }
```
