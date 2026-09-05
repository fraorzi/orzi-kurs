# Medium - dziedziczenie: Animal i Rabbit

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Kanoniczny przykład z javascript.info („Class inheritance"). Napisz dwie klasy.

## `Animal`

- `constructor(name)` - ustawia `name` i `speed = 0`,
- `run(speed)` - ustawia prędkość, zwraca `"<name> biegnie z prędkością <speed>"`,
- `stop()` - zeruje prędkość, zwraca `"<name> stoi"`.

## `Rabbit extends Animal`

- `constructor(name, earLength)` - **wywołuje super** i ustawia `earLength`,
- `hide()` → `"<name> się chowa"`,
- nadpisane `stop()`: najpierw zatrzymuje się jak każde zwierzę
  (**przez `super.stop()`**), potem się chowa - zwraca
  `"<name> stoi i <name> się chowa"` (sklej wyniki przez `" i "`).

```js
const rabbit = new Rabbit("Bunia", 10);
rabbit.run(5);      // "Bunia biegnie z prędkością 5"
rabbit.speed;       // 5
rabbit.earLength;   // 10
rabbit.stop();      // "Bunia stoi i Bunia się chowa"
rabbit.speed;       // 0

rabbit instanceof Animal; // true
```
