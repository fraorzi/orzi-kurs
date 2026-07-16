# Hard — plugin rozszerzający mapę zdarzeń

Rdzeń `events.ts` definiuje `AppEvents` i generyczny `EventBus`. Plugin płatności
ma dopisać przez module augmentation zdarzenia:

```ts
paymentCaptured: { orderId: string; amount: number };
paymentFailed: { orderId: string; reason: string };
```

Zaimplementuj także `registerPaymentAudit(bus, audit)`, które zapisuje:

- `"captured:<orderId>:<amount z 2 miejscami>"`,
- `"failed:<orderId>:<reason>"`.

Po imporcie pluginu ten sam `EventBus` z rdzenia ma przyjmować nowe nazwy i dokładne
payloady. Nie edytuj `events.ts`.
