# Medium — typ rozłączny i wyczerpanie unii

Modelujemy zdarzenia analityczne. Każde ma inne dane, ale wspólne pole `type`.

## 1. Typ `AnalyticsEvent`

Unia rozłączna trzech wariantów (dyskryminator: `type`):

```ts
{ type: "pageview"; path: string }
{ type: "click";    selector: string; count: number }
{ type: "error";    message: string; fatal: boolean }
```

## 2. `describeEvent(event: AnalyticsEvent): string`

```ts
describeEvent({ type: "pageview", path: "/home" });
// "pageview: /home"

describeEvent({ type: "click", selector: "#buy", count: 3 });
// "click: #buy ×3"

describeEvent({ type: "error", message: "boom", fatal: true });
// "error: boom (krytyczny)"

describeEvent({ type: "error", message: "boom", fatal: false });
// "error: boom"
```

Użyj `switch (event.type)` — w każdej gałęzi kompilator zna dokładny wariant.

W `default` postaw bramkę wyczerpania:

```ts
default: {
  const exhaustive: never = event;
  throw new Error(`nieznane zdarzenie: ${JSON.stringify(exhaustive)}`);
}
```

Gdy ktoś dopisze do unii czwarty wariant i zapomni go obsłużyć, kompilacja padnie właśnie
tutaj. To jest cel, nie efekt uboczny.

## 3. `countFatal(events: AnalyticsEvent[]): number`

Liczba zdarzeń `error` z `fatal: true`. Pozostałe warianty nie mają pola `fatal` —
zawężaj po `type`, nie po `"fatal" in event`.

```ts
countFatal([
  { type: "pageview", path: "/" },
  { type: "error", message: "a", fatal: true },
  { type: "error", message: "b", fatal: false },
]); // 1
```
