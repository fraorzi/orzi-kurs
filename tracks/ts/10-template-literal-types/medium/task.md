# Medium — key remapping: generowanie kluczy obiektu

Template literal w klauzuli `as` mapped type'u **przepisuje nazwy kluczy**. Trzy typy
i trzy funkcje, które je realizują w runtime.

## 1. `Getters<T>` i `makeGetters`

Dla każdego pola `T` powstaje getter `get<Pole>`:

```ts
type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

const user = { name: "Ala", age: 7 };
const getters = makeGetters(user);

getters.getName();  // "Ala"  (typ: string)
getters.getAge();   // 7      (typ: number)
```

Sygnatura: `makeGetters<T extends object>(source: T): Getters<T>`.

## 2. `ChangeHandlers<T>` i `makeChangeHandlers`

Dla każdego pola powstaje handler `on<Pole>Change`, przyjmujący **wartość tego pola**:

```ts
type FormHandlers = ChangeHandlers<{ name: string; age: number }>;
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void }
```

`makeChangeHandlers<T extends object>(state: T, onChange: (next: T) => void):
ChangeHandlers<T>`

Każdy handler woła `onChange` z **nowym** obiektem stanu — z podmienionym jednym polem.
Nie mutuje `state`:

```ts
let current = { name: "Ala", age: 7 };
const handlers = makeChangeHandlers(current, (next) => { current = next; });

handlers.onAgeChange(8);
current;  // { name: "Ala", age: 8 }
```

Typ pilnuje wartości: `handlers.onAgeChange("osiem")` to błąd typu.

## 3. `WithoutInternal<T>` i `stripInternal`

Pola z prefiksem `_` są wewnętrzne — mają zniknąć **z typu i z obiektu**:

```ts
type Public = WithoutInternal<{ id: number; _secret: string; name: string }>;
// { id: number; name: string }

stripInternal({ id: 1, _secret: "x", name: "Ala" });  // { id: 1, name: "Ala" }
```

Klucz zwrócony jako `never` w klauzuli `as` **znika** z wynikowego typu — to jedyny sposób
filtrowania kluczy w mapped type.

## Wskazówka

`keyof T` może zawierać `symbol`, a template literal przyjmuje tylko stringi — stąd
`keyof T & string` w `Getters` i `ChangeHandlers`. W `WithoutInternal` klucza **nie
przepisujesz**, tylko warunkowo kasujesz, więc `keyof T` wystarczy.
