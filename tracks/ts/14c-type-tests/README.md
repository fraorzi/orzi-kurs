# Testowanie typów

Test runtime nie widzi, że funkcja zaczęła zwracać `any`, poszerzyła literal do
`string` albo przestała odrzucać zły argument. Publiczny kontrakt TypeScript wymaga
osobnej regresji compile-time.

## Test pozytywny

Helpery porównują dokładny typ:

```ts
type _result = Expect<Equal<
  ReturnType<typeof createUser>,
  User
>>;
```

Podkreślenie na początku nazwy sygnalizuje, że alias istnieje wyłącznie dla kompilatora.

## Test negatywny

`@ts-expect-error` wymaga błędu na następnej linii:

```ts
// @ts-expect-error nieznana rola
createUser({ name: "Ala", role: "owner" });
```

Jeśli API przypadkowo zacznie akceptować złą wartość, dyrektywa stanie się
„unused” i test obleje. To przewaga nad `@ts-ignore`.

## Ochrona przed `any`

Dokładne `Equal` czasem nie wystarcza, bo `any` zachowuje się specjalnie. Osobny
helper `NotAny<T>` wykrywa utratę kontraktu w generycznym API.

## Organizacja

Plik `type-tests.ts` jest kompilowany przez `tsc --noEmit`, ale nie musi być uruchamiany
przez test runner. Testy runtime nadal sprawdzają prawdziwe zachowanie implementacji.

## Kiedy używać

- bibliotek, SDK i shared packages,
- generycznych helperów oraz overloadów,
- regresji po zmianie TypeScriptu lub deklaracji `.d.ts`.

## Kiedy unikać

- testowania każdego lokalnego typu bez wartości publicznej,
- snapshotów wielkich komunikatów diagnostycznych,
- `@ts-ignore`, który nie sprawdza, czy błąd nadal istnieje.

## Pułapki

- dyrektywa dotyczy tylko następnej linii,
- test typu może przejść, a implementacja nadal być błędna runtime,
- `Equal` bywa wrażliwe na przecięcia i reprezentację równoważnych typów,
- testy muszą być uruchamiane na wszystkich wspieranych wersjach kompilatora.

Źródła: TypeScript Handbook — Comments Directives; podejście type-challenges i
praktyki testów deklaracji DefinitelyTyped.
