# ts+react — typowany reducer i Context koszyka

Projekt łączy dwie warstwy: model stanu w TypeScript (dyskryminowana unia
akcji + czysty reducer) i jego dystrybucję w React (Context + Provider +
własny hook). Modeluje wzorzec, który powtarza się w każdej nietrywialnej
aplikacji: pojedyncze źródło prawdy dla stanu współdzielonego, z bezpiecznym
dostępem.

## Kontekst

Koszyk zakupowy trzyma ilość pozycji. Stan jest współdzielony przez wiele
komponentów, więc mieszka w Context, a zmiany idą przez reducer (nie przez
rozproszone `setState`). Dwie rzeczy muszą być odporne: stan nie może stać
się niespójny (ujemna ilość), a konsument nie może przypadkiem działać bez
Providera i dostać cichego, fałszywego stanu.

## Decyzje

- **Dyskryminowana unia akcji + `satisfies never`.** Każda akcja ma pole
  `type`, a `default` w reducerze zwraca `action satisfies never` — dodanie
  nowego wariantu bez obsługi staje się błędem kompilacji, nie cichym bugiem
  runtime.
- **Reducer czysty, clamp na zero.** `Math.max(0, ...)` w dwóch miejscach:
  ujemny `amount` na wejściu i ujemny wynik odejmowania. Niezmiennik
  „ilość ≥ 0" jest wymuszony w jednym miejscu, nie u każdego wołającego.
- **Hook rzuca zamiast fallbacku.** `useCart` poza Providerem to błąd
  programisty — `throw` z czytelnym komunikatem ujawnia go od razu, zamiast
  zwracać `{ count: 0 }` udające prawdziwy stan i maskujące brak Providera.

## Pułapki

- `useContext` bez Providera zwraca wartość domyślną Contextu (`null`) —
  cichy fallback zamienia brak Providera w trudny do znalezienia bug.
- Clamp tylko na wyniku odejmowania przepuszcza ujemny `amount` w `add`.
- `switch` bez `satisfies never` nie ostrzeże, gdy dojdzie nowa akcja —
  wtedy reducer po cichu zwraca stary stan.

## Źródła (audyt 2026-07-20)

- [React: Scaling up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [TypeScript: Narrowing (discriminated unions, never)](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
