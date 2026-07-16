# Typy rekurencyjne

Typ rekurencyjny odwołuje się do siebie dla mniejszej części wejścia. Przydaje się,
gdy struktura danych również jest rekurencyjna: drzewo, zagnieżdżona konfiguracja,
tuple albo ścieżka obiektu.

## Rekurencja po obiekcie

```ts
type DeepReadonly<T> =
  T extends readonly (infer Item)[]
    ? readonly DeepReadonly<Item>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;
```

Każdy poziom wykonuje mały krok i wywołuje typ ponownie dla pola lub elementu.
Trzeba jawnie zdecydować, jak traktować funkcje, daty, mapy i tablice.

## Rekurencja po stringu

Template literal type może dzielić ścieżkę:

```ts
type PathValue<T, P extends string> =
  P extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? PathValue<T[Head], Tail>
      : never
    : P extends keyof T
      ? T[P]
      : never;
```

To pozwala powiązać `"server.port"` z typem `number`, ale duże modele potrafią
wygenerować ogromne unie.

## Rekurencja po tuple i akumulator

```ts
type Reverse<Input, Acc extends readonly unknown[] = []> =
  Input extends readonly [infer Head, ...infer Tail]
    ? Reverse<Tail, readonly [Head, ...Acc]>
    : Acc;
```

Akumulator przechowuje dotychczasowy wynik. Taka forma jest bliższa tail recursion
i zwykle tworzy mniej typów pośrednich niż dokładanie wyniku po powrocie z rekurencji.

## Limity kompilatora

TypeScript chroni edytor przed nieskończoną lub bardzo kosztowną ekspansją. Jeśli
typ staje się zbyt głęboki, zobaczysz diagnostykę o nadmiernej instancjacji. To sygnał
projektowy, a nie zaproszenie do kolejnej sztuczki.

## Kiedy używać

- kilku poziomów konfiguracji i JSON-like danych,
- helperów `DeepReadonly`/`DeepPartial` o jasnej semantyce,
- małych modeli ścieżek lub tuple.

## Kiedy unikać

- generowania tysięcy ścieżek dla schematu API,
- emulowania parsera lub języka w typach,
- rekurencji, której koszt spowalnia autocomplete i CI.

## Pułapki

- `object` obejmuje tablice, funkcje, daty i klasy — kolejność warunków ma znaczenie,
- typ readonly nie zamraża wartości runtime,
- ścieżki tablic wymagają osobnej decyzji o indeksach,
- szeroki `string` niszczy korzyść z unii literalnych,
- dla dużych zbiorów oficjalna dokumentacja zaleca generowanie unii ahead-of-time.

Źródła: TypeScript Handbook — Conditional Types, Mapped Types i Template Literal
Types; TypeScript 4.1 i 4.5 release notes.
