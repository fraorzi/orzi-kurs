# Medium - generyczna klasa i generyczna funkcja wyższego rzędu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

## 1. `class Stack<T>`

Stos LIFO. Parametr typu dotyczy **instancji** - `new Stack<string>()` przyjmuje wyłącznie
stringi.

```ts
push(item: T): void;      // kładzie na wierzch
pop(): T | undefined;     // zdejmuje z wierzchu; pusty stos → undefined
peek(): T | undefined;    // podgląda wierzch, nie zdejmuje
get size(): number;       // liczba elementów (getter, nie metoda)
isEmpty(): boolean;
toArray(): T[];           // KOPIA, od dna do wierzchu
static from<U>(items: readonly U[]): Stack<U>;
```

```ts
const stack = Stack.from([1, 2, 3]);
stack.peek();     // 3
stack.pop();      // 3
stack.size;       // 2
stack.toArray();  // [1, 2]
```

Elementy trzymaj w prywatnym polu (`private readonly items: T[] = []`). `toArray` zwraca
kopię - zmiana zwróconej tablicy nie może ruszyć stosu.

`from` jest **statyczne**, więc nie widzi `T` z klasy - musi zadeklarować własny parametr
typu (`U`).

## 2. `type Transform<T, U> = (value: T) => U`

Alias na funkcję transformującą - dwa parametry typu.

## 3. `mapStack<T, U>(stack: Stack<T>, transform: Transform<T, U>): Stack<U>`

Nowy stos z przetransformowanymi elementami, **kolejność zachowana**, źródłowy stos
nietknięty (nie wolno go opróżnić przez `pop`).

```ts
const numbers = Stack.from([1, 2, 3]);
const labels = mapStack(numbers, (n) => n.toFixed(2));  // Stack<string>

labels.pop();     // "3.00"
numbers.size;     // 3  ← źródło nienaruszone
```

`U` kompilator wywnioskuje z typu zwracanego callbacku - wewnątrz `(n) => …` parametr `n`
ma już typ `number` bez adnotacji.
