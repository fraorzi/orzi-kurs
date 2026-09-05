# Easy - standardowy dekorator metody

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Uzupełnij `traced(log)`. Fabryka ma zwracać standardowy dekorator metody, który:

- przed wywołaniem zapisuje `enter:<nazwa>`,
- po wywołaniu zapisuje `exit:<nazwa>`,
- loguje `exit` także wtedy, gdy metoda rzuci,
- zachowuje `this`, argumenty i typ wyniku oryginalnej metody.

Zadanie dotyczy metod synchronicznych. Nie używaj legacy sygnatury
`target, propertyKey, descriptor`, `experimentalDecorators` ani `any`.

Runner wywołuje funkcję dekoratora bezpośrednio z typowanym contextem, ponieważ jego
transpiler testowy nie emituje jeszcze składni `@`. Sygnatura jest identyczna z tą,
którą standardowy runtime dekoratorów przekazuje przy użyciu `@traced(...)`.
