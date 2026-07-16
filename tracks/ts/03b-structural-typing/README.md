# Typowanie strukturalne

TypeScript porównuje przede wszystkim kształt wartości, a nie nazwę typu. Obiekt
spełnia kontrakt, jeśli ma wymagane pola o zgodnych typach:

```ts
type Named = { name: string };
const account = { id: 1, name: "Ala", token: "sekret" };
const named: Named = account;
```

To ułatwia testowanie i dependency injection: mock nie musi dziedziczyć po klasie,
wystarczy, że implementuje potrzebne operacje.

## Nadmiarowe pola

Literał obiektowy przekazany bezpośrednio przechodzi dodatkową kontrolę:

```ts
saveUser({ name: "Ala", admin: true }); // błąd nadmiarowego pola
```

Ta sama wartość przypisana wcześniej do zmiennej może być zgodna strukturalnie:

```ts
const input = { name: "Ala", admin: true };
saveUser(input); // poprawne, jeśli saveUser wymaga tylko name
```

To nie jest walidacja runtime i nie gwarantuje „dokładnego obiektu”. Gdy publiczne
API naprawdę zabrania dodatkowych kluczy, potrzebujesz pomocniczego typu lub parsera.

## Weak types

Typ z samymi polami opcjonalnymi jest „weak”. TypeScript ostrzega, gdy zmienna nie
ma z nim ani jednego wspólnego pola:

```ts
type UserPatch = { name?: string; email?: string };
const unrelated = { active: true };
applyPatch(unrelated); // brak wspólnych właściwości
```

Nie polegaj na tym jak na walidacji — obiekt z jednym wspólnym i wieloma błędnymi
polami nadal może przejść przez część ścieżek.

## Porty i capability interfaces

Zależność powinna wymagać tylko operacji, których używa:

```ts
interface Clock {
  now(): Date;
}
```

Prawdziwy adapter, fake i obiekt testowy mogą spełniać ten kontrakt bez wspólnej
klasy bazowej. To zwykle daje luźniejsze sprzężenie niż przekazywanie rozbudowanego
serwisu.

## Kiedy używać

- małych interfejsów portów na granicy modułu,
- publicznych widoków danych bez pól wewnętrznych,
- structural mocks i fakes w testach.

## Kiedy unikać

- zakładania, że przypisanie do typu usuwa pola runtime,
- sztucznego dziedziczenia tylko po to, by uzyskać zgodność typów,
- skomplikowanego `Exact` wszędzie; dokładność jest potrzebna głównie na wybranych
  granicach API.

## Pułapki

- excess property checks dotyczą głównie świeżych literałów, nie wszystkich wartości,
- typ z dodatkowymi polami nadal przenosi je w runtime,
- metody klas z `private`/`protected` wpływają na zgodność nominalnie,
- weak type nie zastępuje walidacji danych z sieci.

Źródła: TypeScript Handbook — Object Types, Type Compatibility; Effective TypeScript.
