# Klasy w TypeScript

Klasa w TS to klasa z JS plus typy: pola mają typy, konstruktor jest sprawdzany, a modyfikatory
dostępu opisują, co jest częścią kontraktu, a co szczegółem implementacji.

## Pola i konstruktor

```ts
class Account {
  readonly id: string;
  private balance: number;

  constructor(id: string, initial: number) {
    this.id = id;
    this.balance = initial;
  }
}
```

Przy `strict` każde pole musi zostać zainicjalizowane w konstruktorze (albo mieć wartość
domyślną, albo `?`). Kompilator to sprawdza — to flaga `strictPropertyInitialization`.

## Parameter properties — skrót, który naprawdę się używa

Modyfikator przy parametrze konstruktora deklaruje pole i przypisuje je za Ciebie:

```ts
class Account {
  constructor(
    readonly id: string,
    private balance: number,
  ) {}
}
```

To dokładnie to samo co wersja wyżej, tylko krótsza.

## `private` (TS) vs `#private` (JS)

| | `private balance` | `#balance` |
|---|---|---|
| kto pilnuje | kompilator | silnik JS |
| widoczne w runtime | tak (`obj["balance"]` działa) | nie (`obj.#balance` poza klasą to błąd składni) |
| widoczne w `JSON.stringify` | tak | nie |
| dostęp z innej instancji tej samej klasy | tak | tak |

`private` to kontrakt dla programisty; `#` to prawdziwa enkapsulacja. Do danych, których
naprawdę nikt nie ma tknąć (sekrety, spójność salda) — `#`.

`protected` = dostępne w klasie i podklasach, niedostępne z zewnątrz.

## `implements` i `abstract`

```ts
interface Serializable {
  toJSON(): string;
}

abstract class Shape implements Serializable {
  abstract area(): number;           // podklasa MUSI zaimplementować
  toJSON(): string {
    return JSON.stringify({ area: this.area() });
  }
}

class Square extends Shape {
  constructor(private side: number) { super(); }
  area(): number { return this.side ** 2; }
}
```

`abstract class` nie da się zinstancjonować (`new Shape()` to błąd). `implements` **tylko
sprawdza** zgodność z interfejsem — niczego nie dodaje i nie zmienia typów pól.

## Gettery, settery, pola statyczne

```ts
class Temperature {
  static fromFahrenheit(f: number): Temperature {
    return new Temperature(((f - 32) * 5) / 9);
  }
  constructor(private celsius: number) {}
  get fahrenheit(): number { return this.celsius * 9 / 5 + 32; }
  set fahrenheit(value: number) { this.celsius = ((value - 32) * 5) / 9; }
}
```

Getter bez settera daje pole tylko do odczytu (TS 4.3+ pozwala też, by setter przyjmował
szerszy typ niż zwraca getter).

## Typ instancji vs typ klasy

Nazwa klasy w pozycji typu (`const a: Account`) znaczy **instancję**. Sama klasa jako
wartość ma typ konstruktora: `typeof Account`. Stąd `InstanceType<typeof Account>`.

## Kiedy używać

- Gdy dane i operujące na nich zachowanie żyją razem i masz **wiele instancji** ze stanem
  (konto, kolejka, klient API z konfiguracją).
- `abstract` + `implements`, gdy warianty dzielą kontrakt i część logiki (Shape/Square/Circle).
- `#pole`, gdy niezmiennik musi być nienaruszalny również w runtime.

## Kiedy unikać

- Klasa jako worek na funkcje statyczne — to moduł, nie klasa.
- Dziedziczenie po trzech poziomach, gdy wystarczy kompozycja albo unia rozłączna.
- Klasy w stanie Reacta/Reduxa — tam liczy się serializowalność i porównania po wartości.

## Pułapki

- `implements` nie infekuje typów: jeśli interfejs mówi `toJSON(): string`, a Twoja metoda
  nie ma adnotacji, TS i tak wywnioskuje jej typ z ciała (i może się nie zgodzić).
- Metoda przekazana jako callback gubi `this` (`const f = acc.deposit; f(10)` → wysypka).
  Rozwiązanie: pole z funkcją strzałkową (`deposit = (amount: number) => {…}`) albo `.bind`.
- `private` nie chroni przed `JSON.stringify` ani przed `obj as any`.
- Pole `readonly` można ustawić tylko w konstruktorze — potem jest zamrożone dla kompilatora
  (ale nie w runtime).
- `strictPropertyInitialization` łapie pola niezainicjalizowane, ale nie pola ustawiane
  w metodzie `init()` — kompilator nie wie, że ją wołasz.

Źródła: TypeScript Handbook — „Classes" (Members, Parameter Properties, Class Heritage,
`abstract`, Member Visibility); MDN — prywatne pola klas (`#`).
