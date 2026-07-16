## Hint 1

Worek opcjonalnych pól (`{ type: string; path?: string; ... }`) dopuszcza stany, które nie
istnieją — np. click z `message`. Zamiast tego wypisz warianty jako unię obiektów, każdy
z własnym literalnym `type`.

## Hint 2

```ts
export type AnalyticsEvent =
  | { type: "pageview"; path: string }
  | { type: "click"; selector: string; count: number }
  | { type: "error"; message: string; fatal: boolean };
```

Po `switch (event.type)` w gałęzi `case "click"` kompilator widzi już tylko wariant click —
`event.selector` jest dostępne bez żadnych sprawdzeń.

## Hint 3

Bramka wyczerpania w `default`:

```ts
const exhaustive: never = event;
```

Jeśli obsłużyłeś wszystkie warianty, `event` ma tu typ `never` i przypisanie przechodzi.
Jeśli któryś zostawiłeś — kompilator zgłosi, że `{ type: "..." }` nie jest `never`.

## Hint 4

`countFatal`: warunek `event.type === "error" && event.fatal` zawęża wariant przed sięgnięciem
po `fatal`. Sprawdzanie `"fatal" in event` też by zadziałało, ale dyskryminator jest tańszy
w czytaniu i odporny na zmiany kształtu wariantów.
