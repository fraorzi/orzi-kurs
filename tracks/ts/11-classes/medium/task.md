# Medium — klasa abstrakcyjna i `implements`

## 1. `interface Describable`

```ts
interface Describable {
  describe(): string;
}
```

## 2. `abstract class Shape implements Describable`

- `abstract area(): number` — podklasa musi zaimplementować,
- `abstract readonly kind: string` — nazwa kształtu,
- `describe(): string` — implementacja wspólna: `"circle: 12.57"` (pole `kind`, dwukropek,
  pole area z dwoma miejscami po przecinku).

`new Shape()` ma być błędem typu.

## 3. `Circle` i `Rectangle`

```ts
const c = new Circle(2);         // promień
c.kind;      // "circle"
c.area();    // 12.566370614359172   (π r²)
c.describe();// "circle: 12.57"

const r = new Rectangle(3, 4);   // szerokość, wysokość
r.kind;      // "rectangle"
r.area();    // 12
r.describe();// "rectangle: 12.00"
```

Wymiary trzymaj jako `private readonly` (parameter properties).

## 4. `Square extends Rectangle`

Kwadrat to prostokąt o równych bokach. `kind` ma być `"square"`.

```ts
const s = new Square(3);
s.area();     // 9
s.describe(); // "square: 9.00"
s instanceof Rectangle; // true
```

## 5. `totalArea(shapes: readonly Shape[]): number`

Suma pól, zaokrąglona do dwóch miejsc.

```ts
totalArea([new Circle(1), new Rectangle(2, 3)]); // 9.14
```

## 6. `largest(shapes: readonly Shape[]): Shape | null`

Kształt o największym polu; przy remisie — pierwszy z listy. Pusta lista → `null`.
Nie mutuj wejścia (`sort` mutuje!).
