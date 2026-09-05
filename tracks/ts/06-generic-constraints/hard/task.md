# Hard - typowana szyna zdarzeń (EventBus)

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

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
`Record<string, unknown>` - kompilator powie: „Index signature for type 'string' is
missing”. Alias obiektowy taką sygnaturę dostaje.

## `class EventBus`

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

- `on` rejestruje handler i zwraca idempotentną funkcję odpinającą.
- `once` rejestruje handler jednorazowy i również zwraca funkcję odpinającą.
- `off` odpina konkretny handler i informuje, czy był zarejestrowany.
- `emit` przyjmuje ładunek właściwy dla wybranego zdarzenia, wywołuje handlery w kolejności
  rejestracji i zwraca ich liczbę.
- `listenerCount` zwraca liczbę słuchaczy zdarzenia, a `removeAll` usuwa wszystkich.

Każda metoda zależna od nazwy zdarzenia ma akceptować wyłącznie klucze mapy `TEvents`, a typ
handlera lub ładunku ma wynikać z wartości pod tym kluczem.

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
bus.emit("tick", 2);  // 2  - handler z once już odpięty

log;  // ["a1", "b1", "c1", "a2", "c2"]
```
