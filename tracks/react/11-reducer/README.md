# useReducer i projektowanie akcji

`useReducer` przenosi logikę wielu powiązanych aktualizacji do czystej funkcji:

```tsx
type Action =
  | { readonly type: "incremented" }
  | { readonly type: "reset"; readonly value: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "incremented":
      return state + 1;
    case "reset":
      return action.value;
  }
}
```

Komponent otrzymuje `[state, dispatch]`. Handler opisuje, co się wydarzyło, a reducer
decyduje, jak z tego zdarzenia powstaje następny stan.

## Akcje opisują zdarzenia

Dobra nazwa akcji mówi o intencji użytkownika lub systemu: `task_added`,
`quantity_changed`, `request_succeeded`. Nie musi odzwierciedlać nazwy settera.

Jedna akcja może spójnie zmienić kilka pól, jeśli opisuje jedno zdarzenie. Reset
formularza jest jedną akcją, a nie serią pięciu osobnych dispatchy.

## Reducer jest czysty

Reducer działa podczas renderowania i podlega tym samym regułom czystości:

- nie mutuje stanu,
- nie wykonuje requestów ani timerów,
- nie czyta zmiennych zmieniających się poza argumentami,
- dla tych samych argumentów zwraca ten sam wynik.

Efekty uboczne zostają w handlerze albo efekcie. Reducer jedynie wylicza następny stan.

## Inicjalizacja

Trzeci argument `useReducer(reducer, initialArg, init)` pozwala wykonać kosztowną lub
strukturalną inicjalizację tylko przy tworzeniu stanu:

```tsx
const [history, dispatch] = useReducer(
  historyReducer,
  initialStatus,
  createHistory,
);
```

Nie używaj go bez potrzeby dla prostego prymitywu.

## Kiedy używać

- Gdy wiele handlerów modyfikuje tę samą złożoną strukturę.
- Gdy ważne jest logowanie i testowanie sekwencji zdarzeń domenowych.
- Gdy jedna interakcja musi atomowo zmienić kilka powiązanych pól.

## Kiedy unikać

- Nie zastępuj pojedynczego prostego booleanowego stanu boilerplate’em reducera.
- Nie dispatchuj akcji z reducera.
- Nie umieszczaj efektów ubocznych w reducerze.

## Pułapki

- Mutacja i zwrócenie tej samej referencji może nie odświeżyć UI.
- Akcja o zbyt ogólnym typie `set_state` ukrywa intencję i utrudnia debugowanie.
- Undo/redo musi wyczyścić przyszłość po nowej zmianie wykonanej po cofnięciu.
- Inicjalizator również powinien być czysty, bo tryb deweloperski może go sprawdzać
  więcej niż raz.

## Źródła

- <https://react.dev/reference/react/useReducer>
- <https://react.dev/learn/extracting-state-logic-into-a-reducer>
- <https://react.dev/learn/scaling-up-with-reducer-and-context>
