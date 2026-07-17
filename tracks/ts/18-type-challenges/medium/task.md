# Medium — parametry z deklaracji trasy

Zaimplementuj `RouteParams<Path>`, który analizuje segmenty ścieżki:

- `:id` tworzy wymagane pole `id: string`,
- `:tab?` tworzy opcjonalne pole `tab?: string`,
- `*rest` tworzy wymagane pole `rest: string[]`,
- segment statyczny niczego nie dodaje,
- szeroki typ `string` zwraca bezpieczny fallback
  `Record<string, string | string[] | undefined>`.

Przykład:

```ts
type Params = RouteParams<"/teams/:teamId/users/:userId/:tab?">;
// { teamId: string; userId: string; tab?: string }
```

Połącz template literal types, `infer`, rekurencję i mapped types. Nie używaj
gotowej listy nazw parametrów.
