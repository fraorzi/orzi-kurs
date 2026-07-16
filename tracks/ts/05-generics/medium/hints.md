## Hint 1

Parametr typu klasy stoi zaraz przy nazwie i jest widoczny we wszystkich polach i metodach
instancji:

```ts
export class Stack<T> {
  private readonly items: T[] = [];

  push(item: T): void { … }
  pop(): T | undefined { … }
}
```

`Array.prototype.pop()` sam zwraca `T | undefined` — nie musisz nic sprawdzać.

## Hint 2

`peek` to wierzch bez zdejmowania: `this.items.at(-1)` (albo `this.items[this.items.length - 1]`).
`size` to **getter** — `get size(): number { return this.items.length; }` — więc czyta się go
bez nawiasów.

## Hint 3

`toArray` musi zwrócić **kopię**, inaczej wywołujący dostanie uchwyt do prywatnego pola
i będzie mógł je mutować:

```ts
toArray(): T[] {
  return [...this.items];
}
```

## Hint 4

Metoda statyczna należy do klasy, nie do instancji — nie widzi `T`. Deklaruje własny
parametr typu:

```ts
static from<U>(items: readonly U[]): Stack<U> {
  const stack = new Stack<U>();
  for (const item of items) stack.push(item);
  return stack;
}
```

Gdybyś użył w niej `T`, dostałbyś błąd: „Static members cannot reference class type
parameters”.

## Hint 5

`mapStack` nie może zjeść źródła — czytaj przez `toArray()`, a nie `pop()`:

```ts
export function mapStack<T, U>(stack: Stack<T>, transform: Transform<T, U>): Stack<U> {
  return Stack.from(stack.toArray().map(transform));
}
```

`U` wypada z typu zwracanego callbacku — dlatego `mapStack(stackOfNumbers, (n) => n.toFixed(2))`
daje `Stack<string>` bez żadnej adnotacji.
