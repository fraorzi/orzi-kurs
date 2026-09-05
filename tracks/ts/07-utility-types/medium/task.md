# Medium - typy wyprowadzone z kodu i operacje na uniach

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Dwie części. W obu chodzi o to samo: **nie przepisuj typu, który już gdzieś jest**.

## Część 1 - `Parameters`, `ReturnType`, `Awaited`, `NonNullable`

Funkcja `findUser` jest już napisana i nie wolno jej zmieniać:

```ts
async function findUser(id: number, withPosts: boolean): Promise<UserRecord | null>
```

Wyprowadź z niej trzy typy:

```ts
type FindUserArgs   = ...; // [id: number, withPosts: boolean]
type FindUserResult = ...; // UserRecord | null     (po zdjęciu Promise)
type FoundUser      = ...; // UserRecord           (po zdjęciu null)
```

i napisz opakowanie, które nie może zwrócić `null`:

```ts
findUserOrThrow(...args: FindUserArgs): Promise<FoundUser>
```

```ts
await findUserOrThrow(1, true);
// { id: 1, name: "Ala", email: "ala@example.com", posts: [{ id: 10, title: "Wstęp" }] }

await findUserOrThrow(1, false);
// posts: []   ← findUser tak działa przy withPosts = false

await findUserOrThrow(99, true);
// rzuca Error("nie znaleziono użytkownika: 99")
```

Sygnatura ma być zapisana rest-parametrem (`...args: FindUserArgs`) - dopisanie trzeciego
parametru do `findUser` ma automatycznie zmienić kontrakt opakowania.

## Część 2 - `Extract`, `Exclude`, indeksowany dostęp

```ts
type AppEvent =
  | { kind: "click"; x: number; y: number }
  | { kind: "key"; key: string }
  | { kind: "scroll"; top: number }
  | { kind: "close" };
```

Wyprowadź:

```ts
type ClickEvent  = ...; // wariant "click"                 (Extract)
type ActiveEvent = ...; // wszystko poza "close"           (Exclude)
type EventKind   = ...; // "click" | "key" | "scroll" | "close"
```

i trzy funkcje:

```ts
isActive(event: AppEvent): event is ActiveEvent      // predykat: kind !== "close"

describeActive(event: ActiveEvent): string
// click  → "click 3,4"
// key    → "key a"
// scroll → "scroll 100"
// (wariantu "close" tu nie ma - switch bez default ma się kompilować)

filterByKind<K extends EventKind>(
  events: readonly AppEvent[],
  kind: K,
): Extract<AppEvent, { kind: K }>[]
```

```ts
const events: AppEvent[] = [
  { kind: "click", x: 3, y: 4 },
  { kind: "close" },
  { kind: "key", key: "a" },
];

filterByKind(events, "click");  // typ: { kind: "click"; x: number; y: number }[]
filterByKind(events, "close");  // typ: { kind: "close" }[]
events.filter(isActive);        // typ: ActiveEvent[]
```

Sens `filterByKind`: **typ wyniku zależy od przekazanego literału** - `Extract` liczy się
dopiero przy wywołaniu.
