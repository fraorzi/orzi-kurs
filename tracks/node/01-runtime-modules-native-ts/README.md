# Runtime, moduły i natywny TypeScript

## Kiedy

Gdy projekt musi mieć przewidywalny kontrakt uruchomienia, publikowania pakietu i importów między ESM, CommonJS oraz TypeScriptem wykonywanym bez transpile.

## Pułapki

Rozszerzenie pliku ma pierwszeństwo przed `type`; natywny type stripping nie czyta `tsconfig`, nie obsługuje TSX ani składni wymagającej transformacji i wymaga jawnych rozszerzeń importów.

## Źródła

- [Node.js 24 API: modules,packages,typescript](https://nodejs.org/download/release/latest-v24.x/docs/api/modules.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
