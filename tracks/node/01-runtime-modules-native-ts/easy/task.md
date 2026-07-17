# Easy — rozpoznaj format modułu

Piszesz fragment narzędzia developerskiego, które musi wiedzieć, **jak Node
zinterpretuje dany plik**, zanim go uruchomi.

Zaimplementuj `solve(file, packageType)`:

- `.mjs` i `.mts` to zawsze `"esm"`, niezależnie od `packageType`;
- `.cjs` i `.cts` to zawsze `"cjs"`, niezależnie od `packageType`;
- pozostałe pliki (`.js`, `.ts`, …) dziedziczą format z `packageType`:
  `"module"` → `"esm"`, `"commonjs"` → `"cjs"`.

```ts
solve("worker.mts", "commonjs"); // "esm" — rozszerzenie wygrywa
solve("index.ts", "commonjs");   // "cjs" — dziedziczy z package.json
```
