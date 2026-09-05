# Medium - konstruktor i polyfill Object.create

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `Queue(initial = [])` - funkcja konstruktor

Kolejka FIFO w stylu sprzed `class` (tak buduje się obiekty na F.prototype):

- `Queue` to **funkcja konstruktor** - wywoływana `new Queue([1, 2])`,
- stan (skopiowany z `initial` - mutacja kolejki nie zmienia tablicy wejściowej)
  trzymany na `this`,
- metody `enqueue(x)`, `dequeue()` (pusta → `undefined`) i `size()` zdefiniowane
  **na `Queue.prototype`** - współdzielone przez wszystkie instancje.

```js
const q = new Queue([1, 2]);
q.dequeue();  // 1
q.enqueue(3);
q.size();     // 2
q instanceof Queue; // true

const q2 = new Queue();
q.enqueue === q2.enqueue; // true - jedna metoda na prototypie!
```

## 2. `myObjectCreate(proto)`

Polyfill `Object.create` (kanoniczny, wg MDN) - **bez używania**
`Object.create` i `Object.setPrototypeOf`. Technika: tymczasowa funkcja
konstruktor, której `prototype` podmieniasz na `proto`, i `new`.

Uproszczenie względem oryginału: `proto` musi być obiektem - dla `null`
i nie-obiektów rzuć `TypeError` (wariant `Object.create(null)` pomijamy).

```js
const animal = { eats: true };
const rabbit = myObjectCreate(animal);
Object.getPrototypeOf(rabbit) === animal; // true
Object.keys(rabbit);                       // [] - żadnych własnych właściwości

myObjectCreate(null); // TypeError (w tym zadaniu)
```
