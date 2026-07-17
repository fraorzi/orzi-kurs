## Hint 1

Nazwy tras to `keyof typeof ROUTES`.

## Hint 2

Unia ścieżek to indexed access: `(typeof ROUTES)[RouteName]`.

## Hint 3

Do runtime sprawdzenia własnego klucza użyj `Object.hasOwn(ROUTES, value)`.
