## Hint 1

Kształt klasy:

```ts
export class EventBus<TEvents extends EventMap> {
  #handlers = new Map<keyof TEvents, ...>();

  on<K extends keyof TEvents>(event: K, handler: (payload: TEvents[K]) => void): () => void
}
```

`TEvents[K]` to indexed access — ładunek dokładnie tego zdarzenia. Dzięki temu w `on("login", …)`
parametr handlera ma typ `{ userId: number }` bez żadnej adnotacji po stronie użytkownika.

## Hint 2

Mapa nie może trzymać `(payload: TEvents[K]) => void`, bo `K` istnieje tylko w metodzie.
Potrzebny wspólny typ handlera w rejestrze:

```ts
type AnyHandler = (payload: never) => void;
#handlers = new Map<keyof TEvents, AnyHandler[]>();
```

`never` jako parametr działa, bo funkcje są kontrawariantne po argumencie — każdy handler
jest przypisywalny do `(payload: never) => void`. Przy zapisie i wywołaniu potrzebne będzie
jedno `as`.

## Hint 3

`on` zwraca domknięcie odpinające:

```ts
return () => { this.off(event, handler); };
```

`off` szuka handlera przez `indexOf` i usuwa go przez `splice`. Drugie wywołanie
`unsubscribe()` nic nie znajdzie i zwróci `false` — i dobrze.

## Hint 4

`once` to `on` z opakowanym handlerem, który najpierw odpina sam siebie:

```ts
const wrapped = (payload: TEvents[K]): void => {
  this.off(event, wrapped);
  handler(payload);
};
return this.on(event, wrapped);
```

## Hint 5

`emit` musi być odporny na zmiany listy w trakcie iteracji:

- iteruj po **kopii** (`[...listeners]`) — inaczej handler dopisany w trakcie odpali się
  natychmiast, a `splice` w trakcie pętli pominie element,
- przed każdym wywołaniem sprawdź `listeners.includes(handler)` — handler odpięty przez
  wcześniejszy handler nie ma prawa się odpalić,
- licz faktyczne wywołania i tę liczbę zwróć.
