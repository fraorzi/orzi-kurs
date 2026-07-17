# Hard — plan dwukompilatorowej migracji

Zaimplementuj `buildMigrationPlan(input)`. Plan ma przeprowadzić repo przez okres,
w którym TypeScript 6 dostarcza Compiler API dla narzędzi, a TypeScript 7 wykonuje
dodatkowy typecheck przez natywne CLI.

Kolejność:

1. instalacja aliasów TS 6 i TS 7,
2. naprawa każdego blockera w podanej kolejności,
3. typecheck TS 6 z `--stableTypeOrdering`,
4. narzędzia wymagające Compiler API na TS 6,
5. typecheck TS 7,
6. narzędzia używające wyłącznie CLI na TS 7.

Obsłuż `pnpm` i `npm`. Każdy typecheck ma używać `--noEmit -p <configPath>`.
Nie dodawaj `ignoreDeprecations`.
