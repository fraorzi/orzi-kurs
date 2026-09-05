# Easy - zamień URL modułu na ścieżkę

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Moduł ESM chce wczytać plik leżący obok siebie. Zaimplementuj
`solve(moduleUrl, relativeFile)`:

- `moduleUrl` to wartość w formacie `import.meta.url`
  (np. `"file:///app/src/index.js"`);
- zwróć **pathname** pliku rozwiązanego względem modułu przez standardowe API `URL`;
- względne segmenty (`./`, `../`) mają działać jak w imporcie - bez ręcznego
  sklejania separatorów.

```ts
solve("file:///app/src/index.js", "./data.json"); // "/app/src/data.json"
solve("file:///app/src/index.js", "../config.yml"); // "/app/config.yml"
```
