# Easy — `satisfies` zamiast adnotacji i `as`

## 1. `ROUTES`

Mapa tras. Ma **jednocześnie**:

- być sprawdzona względem `Record<string, string>` (każda wartość to string),
- zachować typy literalne wartości (`ROUTES.home` ma typ `"/"`, nie `string`).

Potrzebujesz obu narzędzi naraz: `as const satisfies Record<string, string>`. Samo
`satisfies` sprawdzi kształt, ale wartości rozszerzy do `string` (bo tego oczekuje typ
docelowy) — literały zachowuje dopiero `as const`.

```ts
ROUTES.home;  // typ: "/"
ROUTES.post;  // typ: "/posts/:id"
```

Zawartość:

```ts
{ home: "/", posts: "/posts", post: "/posts/:id", about: "/o-nas" }
```

## 2. `RouteName`

Unia kluczy `ROUTES` (`"home" | "posts" | "post" | "about"`), wyprowadzona z obiektu.

## 3. `pathOf(name: RouteName): string`

```ts
pathOf("home");   // "/"
pathOf("nieznana"); // błąd typu
```

## 4. `THEME`

Konfiguracja motywu — `as const satisfies ThemeConfig`, gdzie:

```ts
interface ThemeConfig {
  mode: "light" | "dark";
  radiusPx: number;
  fontFamily: string;
}
```

Wartości: `mode: "dark"`, `radiusPx: 8`, `fontFamily: "JetBrains Mono"`.

Po `as const satisfies` pole `THEME.mode` ma typ `"dark"` (nie unię), a literówka w `mode`
(np. `"drak"`) byłaby błędem kompilacji.

## 5. `isDark(): boolean`

Zwraca `true`, gdy `THEME.mode` to `"dark"`.
