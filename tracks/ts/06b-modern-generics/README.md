# Nowoczesne generyki

Dobry generyk nie tylko „przyjmuje różne typy”. Powinien zachować informację, którą
wywołujący już posiada, i nie pozwalać niepowiązanym argumentom przypadkowo poszerzać
kontraktu.

## `const` type parameters

Od TS 5.0 parametr typu może mieć modyfikator `const`:

```ts
function defineRoutes<const T extends Record<string, string>>(routes: T): T {
  return routes;
}

const routes = defineRoutes({ home: "/", account: "/account" });
// wartości pozostają literalne bez `as const` po stronie wywołującego
```

Najlepiej działa dla wartości utworzonej bezpośrednio w wywołaniu. Jeśli zmienna
została wcześniej poszerzona do `string[]`, `const` nie odzyska utraconych literałów.

## `NoInfer<T>`

Zwykle każdy argument bierze udział w inferencji. Czasem jeden argument ma zostać
tylko sprawdzony wobec typu wywnioskowanego gdzie indziej:

```ts
function choose<C extends string>(
  options: readonly C[],
  fallback: NoInfer<C>,
): C;
```

Bez `NoInfer` błędny fallback może poszerzyć `C` i sam zalegalizować swoją wartość.

## Sygnatury funkcji wyższego rzędu

Wrapper powinien przenieść argumenty i wynik:

```ts
function wrap<Args extends readonly unknown[], Result>(
  fn: (...args: Args) => Result,
): (...args: Args) => Result {
  return (...args) => fn(...args);
}
```

Osobne `Args` i `Result` są zwykle czytelniejsze niż szerokie `Function` albo `any`.

## Kiedy używać

- buildery konfiguracji i rejestry zachowujące literały,
- API z wartością domyślną zależną od głównego argumentu,
- retry, cache, logowanie i timeout opakowujące istniejącą funkcję.

## Kiedy unikać

- `const` na każdym parametrze typu — może tworzyć zbyt wąskie readonly typy,
- `NoInfer` do maskowania źle zaprojektowanej kolejności argumentów,
- generycznego wrappera, który faktycznie zmienia kontrakt argumentów lub wyniku.

## Pułapki

- constraint nie jest typem wyniku; `T extends X` ma zwykle zwrócić `T`, nie `X`,
- `NoInfer` blokuje źródło inferencji, ale nadal sprawdza zgodność,
- wrapper async musi zachować odrzucenia i nie połykać ostatniego błędu,
- `(...args: any[]) => any` działa, ale rozlewa `any` na implementację.

Źródła: TypeScript 5.0 release notes — const type parameters; TypeScript 5.4 release
notes — NoInfer; TypeScript Handbook — Generics.
