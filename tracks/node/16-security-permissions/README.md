# Bezpieczeństwo i Permission Model

## Kiedy

Gdy proces operuje na nieufnych ścieżkach, uruchamia narzędzia lub może ograniczyć własny blast radius deklaratywnymi uprawnieniami Node.

## Pułapki

Permission Model jest pasem bezpieczeństwa, nie sandboxem na złośliwy kod; symlinki mogą ominąć intuicyjne granice; allow-lista musi dotyczyć danych po walidacji.

## Źródła

- [Node.js 24 API: permissions,security](https://nodejs.org/download/release/latest-v24.x/docs/api/permissions.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
