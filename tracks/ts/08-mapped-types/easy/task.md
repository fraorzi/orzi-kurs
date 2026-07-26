# Easy — własne odpowiedniki utility types

Napisz cztery mapped types (bez używania wbudowanych `Partial`, `Readonly` itd.) i dwie
funkcje, które z nich korzystają.

## Typy

```ts
type MyPartial<T>   // każde pole opcjonalne
type MyReadonly<T>  // każde pole readonly
type Mutable<T>     // zdejmuje readonly z każdego pola
type Nullable<T>    // wartość każdego pola dopuszcza null
```

```ts
interface User { name: string; age: number }

MyPartial<User>;   // { name?: string; age?: number }
MyReadonly<User>;  // { readonly name: string; readonly age: number }
Mutable<MyReadonly<User>>;  // { name: string; age: number }
Nullable<User>;    // { name: string | null; age: number | null }
```

## Funkcje

```ts
toDraft<T extends object>(source: MyReadonly<T>): Mutable<T>
// płytka kopia — wynik wolno mutować

clearFields<T extends object>(source: T): Nullable<T>
// ten sam komplet kluczy, każda wartość ustawiona na null
```

```ts
const frozen: MyReadonly<User> = { name: "Ala", age: 30 };

const draft = toDraft(frozen);
draft.age = 31;              // OK — kopia jest mutowalna
frozen.age = 31;             // błąd typu — źródło readonly

clearFields({ name: "Ala", age: 30 });  // { name: null, age: null }
```
