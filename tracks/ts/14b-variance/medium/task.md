# Medium - naprawa bivariant callback API

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Starter deklaruje `Handler<T>` metodą. To pozwala przypisać handler tylko dla `Dog`
do miejsca, które może przekazać dowolne `Animal`.

Napraw kontrakt przez właściwość funkcyjną:

```ts
interface Handler<T> {
  handle: (value: T) => void;
}
```

Zaimplementuj `notifyAll(animals, handler)`. Test compile-time ma odrzucić handler
wywołujący `bark()` dla każdego zwierzęcia.
