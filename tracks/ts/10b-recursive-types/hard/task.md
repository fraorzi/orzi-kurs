# Hard - odwracanie tuple z akumulatorem

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj tail-recursive typ:

```ts
type Reverse<
  Input extends readonly unknown[],
  Acc extends readonly unknown[] = []
> = ...
```

Każdy krok ma zdejmować pierwszy element `Input` i dodawać go na początek `Acc`.
Zaimplementuj też `reverseTuple`, która nie mutuje wejścia i zachowuje literalne typy.

Nie używaj ręcznie rozpisanych overloadów ani ograniczenia liczby elementów.
