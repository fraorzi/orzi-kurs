## Hint 1

Żeby wyciągnąć typ z funkcji, potrzebujesz jej **typu**, a nie wartości — stąd `typeof`:

```ts
export type FindUserArgs = Parameters<typeof findUser>;
export type FindUserResult = Awaited<ReturnType<typeof findUser>>;
```

`ReturnType<typeof findUser>` to `Promise<UserRecord | null>`; `Awaited` zdejmuje `Promise`.

## Hint 2

Krotkę z `Parameters` wstawiasz wprost jako rest-parametr i przekazujesz dalej spreadem:

```ts
export async function findUserOrThrow(...args: FindUserArgs): Promise<FoundUser> {
  const user = await findUser(...args);
  …
}
```

Do komunikatu błędu weź `args[0]` — to `id`.

## Hint 3

`Extract<T, U>` zostawia z unii `T` te warianty, które pasują do `U`; `Exclude<T, U>` je
wyrzuca. Wzorzec `U` może być cząstkowy — wystarczy dyskryminator:

```ts
export type ClickEvent = Extract<AppEvent, { kind: "click" }>;
export type ActiveEvent = Exclude<AppEvent, { kind: "close" }>;
```

## Hint 4

`describeActive` przyjmuje `ActiveEvent`, więc w `switch` są tylko trzy przypadki i
**żadnego `default`** — kompilator widzi, że unia się wyczerpała, i nie żąda `return` na
końcu. Jeśli żąda, znaczy że `ActiveEvent` nadal zawiera `"close"`.

## Hint 5

`filterByKind` jest generyczne po **literale**:

```ts
export function filterByKind<K extends EventKind>(
  events: readonly AppEvent[],
  kind: K,
): Extract<AppEvent, { kind: K }>[] {
  return events.filter(
    (event): event is Extract<AppEvent, { kind: K }> => event.kind === kind,
  );
}
```

`Extract` z parametrem `K` policzy się dopiero przy wywołaniu — dlatego
`filterByKind(events, "click")` ma typ `ClickEvent[]`, a nie `AppEvent[]`.
Bez predykatu w `filter` wynik zostałby `AppEvent[]`.
