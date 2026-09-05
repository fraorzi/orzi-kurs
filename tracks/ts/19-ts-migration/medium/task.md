# Medium - audyt gotowości na TypeScript 7

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `auditTs7Readiness(options, facts)`. Funkcja analizuje uproszczony
snapshot repozytorium i zwraca uporządkowaną listę problemów migracyjnych.

Wykrywaj:

1. `baseUrl`,
2. `moduleResolution` równe `node`, `node10` albo `classic`,
3. `module` równe `amd`, `umd`, `systemjs` albo `none`,
4. `esModuleInterop: false` lub `allowSyntheticDefaultImports: false`,
5. stare import assertions,
6. składnię namespace z dawnym słowem `module`,
7. brak jawnego `types`, gdy projekt wymaga globals,
8. brak `rootDir`, gdy tsconfig leży ponad katalogiem źródeł,
9. brak jawnego `strict`,
10. wywołania `tsc file.ts` w katalogu z tsconfigiem.

Każdy wynik ma kod, poziom oraz konkretną rekomendację. Dla resolution wybierz
`bundler` w aplikacji bundlowanej i `nodenext` w projekcie uruchamianym bezpośrednio
przez Node.
