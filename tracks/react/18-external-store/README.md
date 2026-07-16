# Zewnętrzne źródła stanu i `useSyncExternalStore`

`useSyncExternalStore` łączy React z danymi zmieniającymi się poza jego stanem:

```tsx
const snapshot = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot,
);
```

Dotyczy to bibliotek state management, własnych store'ów, WebSocketów i API
przeglądarki takich jak status połączenia.

## Kontrakt subskrypcji

`subscribe(callback)` rejestruje callback wywoływany po zmianie danych i zwraca
funkcję cleanup. React odpina subskrypcję przy unmount albo zmianie funkcji
`subscribe`.

Funkcje store'a powinny mieć stabilną tożsamość. Definiowanie nowego `subscribe`
w renderze powoduje niepotrzebne odpinanie i ponowne podpinanie.

## Kontrakt snapshotu

`getSnapshot` zwraca wartość używaną do renderowania. Dopóki dane się nie zmieniły,
kolejne wywołania muszą zwracać tę samą wartość według `Object.is`.

Jeśli źródło wewnętrznie mutuje dane, zbuduj niemutowalny snapshot tylko przy
zmianie i cache'uj go do następnej zmiany. Zwracanie nowego obiektu za każdym
razem może prowadzić do nieskończonych renderów.

## Server rendering

Trzeci argument `getServerSnapshot` dostarcza wartość podczas renderowania na
serwerze i pierwszej hydratacji. Musi odpowiadać danym przekazanym klientowi.
Bez niego komponent korzystający z external store nie może być renderowany na
serwerze.

## Kiedy używać

- Dla danych istniejących poza Reactem i posiadających mechanizm subskrypcji.
- W adapterach bibliotek state management i browser APIs.
- Gdy potrzebujesz bezpiecznego snapshotu zgodnego z concurrent rendering.

## Kiedy unikać

- Lokalny stan komponentu nadal powinien używać `useState` lub `useReducer`.
- Nie buduj globalnego store'a tylko po to, by ominąć propsy w małym drzewie.
- Nie zawieszaj UI na podstawie mutable external store bez przemyślanej integracji.

## Pułapki

- Brak cleanup zostawia listener po unmount.
- Nowy obiekt z `getSnapshot` przy każdym odczycie łamie kontrakt cache.
- Zmieniony store bez wywołania callbacków nie powiadomi Reacta.
- Inny server snapshot niż pierwszy klienta powoduje problemy hydratacji.

## Źródła

- <https://react.dev/reference/react/useSyncExternalStore>
- <https://react.dev/reference/react-dom/server/renderToString>
