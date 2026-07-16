# Hard — odwracanie tuple z akumulatorem

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
