# Deskryptory właściwości, gettery i settery

Każda właściwość obiektu ma nie tylko wartość, ale i **flagi** opisujące, jak się
zachowuje. Zwykłe `obj.x = 1` tworzy właściwość ze wszystkimi flagami `true`. Przez
`Object.defineProperty` możesz je ustawić dokładnie — albo zamienić właściwość w parę
getter/setter (właściwość „obliczaną").

## Deskryptor danych

```js
const obj = {};
Object.defineProperty(obj, "x", {
  value: 42,
  writable: false,     // nie można nadpisać przez przypisanie
  enumerable: false,   // nie pojawia się w for..in / Object.keys / JSON.stringify
  configurable: false, // nie można usunąć ani ponownie zdefiniować
});

obj.x;               // 42
Object.keys(obj);    // []  — enumerable: false
JSON.stringify(obj); // "{}"
```

Uwaga: flagi domyślnie (przy `defineProperty`) to `false`. Przy zwykłym `obj.x = 1`
wszystkie są `true`.

## Odczyt deskryptora

```js
Object.getOwnPropertyDescriptor(obj, "x");
// { value: 42, writable: false, enumerable: false, configurable: false }

Object.getOwnPropertyDescriptors(obj); // wszystkie naraz
```

## writable: false w trybie strict

Moduły ES działają w trybie strict, więc przypisanie do właściwości `writable: false`
**rzuca `TypeError`** (poza strict — po cichu nie robi nic). Podobnie zapis do właściwości,
która ma tylko getter.

## Deskryptor akcesora (getter/setter)

Zamiast `value`/`writable` podajesz `get`/`set`. Właściwość wygląda jak zwykłe pole,
ale przy odczycie/zapisie uruchamia funkcję:

```js
const user = {
  name: "Ala",
  surname: "Kowalska",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};

user.fullName;              // "Ala Kowalska"  — wywołuje get
user.fullName = "Jan Nowak"; // wywołuje set
user.name;                  // "Jan"
```

To samo przez `defineProperty` z `{ get, set }` — przydatne, gdy dodajesz akcesor
dynamicznie albo chcesz kontrolować `enumerable`/`configurable`.

## Kiedy używać

- **Właściwości obliczane** (getter) zamiast metody, gdy semantycznie to „pole"
  (np. `fullName`, `area`, `celsius`↔`fahrenheit`).
- **Walidacja przy zapisie** (setter): odrzucaj/normalizuj wartości.
- **Ukrywanie** metadanych przed serializacją/iteracją (`enumerable: false`).
- Wzorzec **observe**: setter powiadamia o zmianie (podstawa reaktywności).

## Kiedy unikać

- Ciężka logika w getterze — wywołujący myśli, że to tani odczyt pola, a to kosztowne
  obliczenie przy każdym `.x`. Wtedy lepiej jawna metoda `compute()`.
- Efekty uboczne w getterze (odczyt nie powinien nic zmieniać) — mylące i groźne.
- Meta-programowanie „bo można" — deskryptory bywają trudniejsze do prześledzenia niż
  zwykłe pola.

## Pułapki

- Flagi przy `defineProperty` domyślnie `false` — łatwo przez przypadek zrobić właściwość
  niezmienną/niewidoczną.
- Nie mieszaj w jednym deskryptorze `value`/`writable` z `get`/`set` — to błąd.
- `enumerable: false` chowa właściwość przed `Object.keys`, `for..in`, spreadem `{...obj}`
  i `JSON.stringify` — dane „znikają" przy kopiowaniu.
- Zapis do właściwości bez `set` (tylko getter) w strict → `TypeError`.
- Getter/setter operują na `this` — uważaj z arrow (nie mają własnego `this`) i z
  destrukturyzacją (odrywa getter od obiektu).
