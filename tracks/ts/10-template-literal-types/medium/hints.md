## Hint 1

Klucze przepisujesz w klauzuli `as` mapped type'u. Szkielet:

```ts
type Getters<T> = {
  [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K];
};
```

`keyof T & string` odsiewa klucze `symbol` (template literal ich nie przyjmie),
`Capitalize<K>` to wbudowany intrinsic type TS.

## Hint 2

`ChangeHandlers<T>` to ta sama sztuczka, tylko szablon ma dwie części tekstu wokół klucza,
a wartość to funkcja przyjmująca `T[K]`:

```ts
[K in keyof T & string as `on${Capitalize<K>}Change`]: (value: T[K]) => void;
```

## Hint 3

W runtime musisz zbudować te nazwy ręcznie: `` `get${key.charAt(0).toUpperCase()}${key.slice(1)}` ``.
TS nie zna związku między pętlą po `Object.keys` a typem wyniku — zbuduj zwykły
`Record<string, ...>` i na końcu zrób jedno `as Getters<T>`.

## Hint 4

Handler nie może mutować `state`. Zrób kopię, podmień pole, oddaj ją do `onChange`:

```ts
const next: T = { ...state };
next[key] = value;
onChange(next);
```

## Hint 5

`WithoutInternal<T>` nie przepisuje klucza — kasuje go warunkowo. Klucz zwrócony jako
`never` znika z wyniku:

```ts
type WithoutInternal<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};
```

W runtime odfiltruj `Object.entries(obj)` po `key.startsWith("_")`.
