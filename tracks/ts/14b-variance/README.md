# Wariancja i bezpieczne podstawianie

Wariancja odpowiada na pytanie: jeśli `Dog` jest podtypem `Animal`, jaki jest związek
między `Container<Dog>` i `Container<Animal>`?

## Producent — kowariancja

Funkcja zwracająca `T` produkuje wartości:

```ts
type Producer<out T> = () => T;
```

Producent psa może być użyty tam, gdzie oczekiwany jest producent zwierzęcia.

## Konsument — kontrawariancja

Callback przyjmujący `T` konsumuje wartości:

```ts
type Consumer<in T> = (value: T) => void;
```

Konsument wszystkich zwierząt może obsłużyć psa. Odwrotnie nie: callback rozumiejący
tylko psy nie może dostać kota.

TypeScript zwykle wyprowadza wariancję strukturalnie. Jawne `in`/`out` są rzadkim
narzędziem autorów bibliotek i muszą odpowiadać faktycznemu użyciu parametru.

## Bivariance metod

`strictFunctionTypes` sprawdza właściwości funkcyjne kontrawariantnie, ale metody
pozostają bivariant dla zgodności:

```ts
interface Unsafe<T> {
  handle(value: T): void;
}

interface Safe<T> {
  handle: (value: T) => void;
}
```

W publicznym callback API właściwość funkcyjna jest zwykle bezpieczniejsza.

## Mutowalne tablice

`Dog[]` bywa przypisywalne do `Animal[]`. Jeśli funkcja dopisze kota, oryginalna
tablica psów przestaje zawierać wyłącznie psy. Parametr readonly usuwa operację zapisu:

```ts
function readAnimals(values: readonly Animal[]) {}
```

Jeśli trzeba dodać element, zwróć nową `Animal[]`.

## Kiedy używać

- review callbacków, eventów i middleware,
- projektowania producer/consumer/store API,
- przyjmowania kolekcji wyłącznie do odczytu.

## Kiedy unikać

- jawnych adnotacji wariancji bez zmierzonego problemu biblioteki,
- method syntax dla callbacku tylko dlatego, że jest krótsza,
- mutowania tablicy przekazanej jako kolekcja podtypu.

## Pułapki

- metody są wyjątkiem od `strictFunctionTypes`,
- getter i setter w jednym typie zwykle czynią parametr inwariantnym,
- adnotacja wariancji nie zmienia dowolnie strukturalnego zachowania typu,
- readonly chroni zapis przez daną referencję, nie zamraża runtime.

Źródła: TSConfig `strictFunctionTypes`; TypeScript 2.6 i 4.7 release notes;
Handbook — Generics i Type Compatibility.
