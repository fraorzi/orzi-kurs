## Hint 1

`Prettify` to mapped type po `keyof T`, który nic nie zmienia — ale przy okazji zmusza
kompilator do rozwinięcia przecięcia:

```ts
type Prettify<T> = { [K in keyof T]: T[K] } & {};
```

Końcówka `& {}` jest tam po to, żeby wynik nie został z powrotem „zwinięty” do aliasu.

## Hint 2

`Optional<T, K>` składa się z dwóch części: pola spoza `K` bez zmian (`Omit<T, K>`) i pola
z `K` jako opcjonalne (`Partial<Pick<T, K>>`). Sklej je przecięciem i spłaszcz:

```ts
type Optional<T, K extends keyof T> = Prettify<Omit<T, K> & Partial<Pick<T, K>>>;
```

## Hint 3

`RequiredOnly<T, K>` to lustrzane odbicie: `Pick<T, K>` (wymagane) plus
`Partial<Omit<T, K>>` (cała reszta opcjonalna).

## Hint 4

W `applyDefaults` zacznij od kopii wartości domyślnych, a potem nadpisz je polami z wejścia:

```ts
const merged: Record<string, unknown> = { ...defaults };
for (const [key, value] of Object.entries(input)) {
  if (value !== undefined) merged[key] = value;
}
```

Warunek `value !== undefined` (nie `if (value)`) — inaczej `0`, `""` i `false` z wejścia
zostaną nadpisane wartością domyślną.
