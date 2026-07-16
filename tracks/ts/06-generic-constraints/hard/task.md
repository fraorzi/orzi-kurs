# Hard — typowana szyna zdarzeń (EventBus)

`EventEmitter` z js/24 przyjmował dowolną nazwę zdarzenia i dowolny ładunek. Tutaj mapa
zdarzeń jest **parametrem typu klasy**, więc kompilator pilnuje jednego i drugiego.

## Typ mapy zdarzeń

```ts
export type EventMap = Record<string, unknown>;

type AppEvents = {
  login: { userId: number };
  logout: null;
  error: { message: string; code: number };
};
```

Mapa zdarzeń musi być **aliasem** (`type`), nie `interface`. Interfejs nie dostaje
niejawnej index signature, więc `interface AppEvents { … }` nie spełnia ograniczenia
`Record<string, unknown>` — kompilator powie: „Index signature for type 'string' is
missing”. Alias obiektowy taką sygnaturę dostaje.

## `class EventBus<TEvents extends EventMap>`

```ts
const bus = new EventBus<AppEvents>();

const unsubscribe = bus.on("login", (payload) => {   // payload: { userId: number }
  console.log(payload.userId);
});

bus.emit("login", { userId: 7 });     // liczba wywołanych handlerów: 1
bus.emit("login", { userId: "7" });   // błąd typu: userId to number
bus.emit("register", null);           // błąd typu: nie ma takiego zdarzenia
unsubscribe();                        // handler odpięty
```

## API

```ts
on<K extends keyof TEvents>(event: K, handler: (payload: TEvents[K]) => void): () => void
// rejestruje handler; zwraca funkcję odpinającą (wywołana dwa razy — nic złego się nie dzieje)

once<K extends keyof TEvents>(event: K, handler: (payload: TEvents[K]) => void): () => void
// handler odpala się najwyżej raz; zwraca funkcję odpinającą (działa też przed pierwszym emit)

off<K extends keyof TEvents>(event: K, handler: (payload: TEvents[K]) => void): boolean
// odpina konkretny handler; true, jeśli faktycznie coś odpięto

emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): number
// wywołuje handlery w kolejności rejestracji; zwraca ich liczbę

listenerCount<K extends keyof TEvents>(event: K): number

removeAll(): void
```

## Zasady

- Handler zarejestrowany dwa razy odpala się dwa razy (`on` nie deduplikuje).
- `emit` na zdarzeniu bez handlerów zwraca `0` i nie rzuca wyjątkiem.
- Handler dopisany **w trakcie** `emit` nie dostaje bieżącego zdarzenia; handler odpięty
  w trakcie `emit` już się nie odpali. (Iteruj po kopii listy i sprawdzaj, czy handler
  nadal jest zapisany.)
- `once` liczy się do `listenerCount` dopóki się nie odpali.

## Przykład kolejności

```ts
const bus = new EventBus<{ tick: number }>();
const log: string[] = [];

bus.on("tick", (n) => log.push(`a${n}`));
bus.once("tick", (n) => log.push(`b${n}`));
bus.on("tick", (n) => log.push(`c${n}`));

bus.emit("tick", 1);  // 3
bus.emit("tick", 2);  // 2  — handler z once już odpięty

log;  // ["a1", "b1", "c1", "a2", "c2"]
```
