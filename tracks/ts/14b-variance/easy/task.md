# Easy - producer i consumer

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zdefiniuj:

```ts
type Producer<out T> = () => T;
type Consumer<in T> = (value: T) => void;
```

Zaimplementuj `transfer(producer, consumer)`, która pobiera jedną wartość i przekazuje
ją konsumentowi.

Testy sprawdzają poprawne kierunki: `Producer<Dog>` może być `Producer<Animal>`,
a `Consumer<Animal>` może być `Consumer<Dog>`. Odwrotne przypisania są błędami.
