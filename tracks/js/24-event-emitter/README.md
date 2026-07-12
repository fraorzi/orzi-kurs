# Własny EventEmitter (pub/sub)

Wzorzec obserwatora (pub/sub): jeden obiekt emituje **zdarzenia**, wiele funkcji może się
na nie **zapisać**. Nadawca nie wie, kto słucha — luźne powiązanie. To silnik zdarzeń
Node (`EventEmitter`), DOM (`addEventListener`) i wielu bibliotek. Zbudujesz własny —
cała mechanika to `Map` zdarzeń i domknięcia.

## Rdzeń: on / emit / off

```js
const bus = createEmitter();

const handler = (payload) => console.log(payload);
bus.on("message", handler);   // zapisz słuchacza
bus.emit("message", "cześć"); // wywołaj wszystkich słuchaczy "message"
bus.off("message", handler);  // wypisz
```

`emit` woła słuchaczy w **kolejności zapisania**, przekazując im argumenty. `emit`
zdarzenia bez słuchaczy nic nie robi (nie jest błędem).

## once — słuchacz jednorazowy

`once` rejestruje słuchacza, który po pierwszym wywołaniu **sam się wypisuje**:

```js
bus.once("ready", init); // init wywoła się co najwyżej raz
bus.emit("ready");        // init()
bus.emit("ready");        // już nic
```

## Semantyka Node, którą warto naśladować

- `on`/`once`/`off` zwracają emitter → **łańcuchowanie** (`bus.on(...).on(...)`).
- `emit` zwraca `boolean`: czy byli jacyś słuchacze.
- `off(event, handler)` usuwa po **referencji** do funkcji — dlatego słuchacza trzeba
  trzymać w zmiennej, żeby móc go wypisać (anonimowej strzałki nie wypiszesz).
- `listenerCount(event)` — ilu słuchaczy.

## Przechowywanie słuchaczy

Naturalna struktura to `Map: event → lista słuchaczy`. Lista (tablica) zachowuje kolejność
zapisania. Przy `emit` iteruj po **kopii** listy — inaczej `once`, który usuwa się w
trakcie, przestawi indeksy i pominiesz słuchaczy.

## Kiedy używać

- Rozprzęganie modułów: nadawca zdarzenia nie musi znać odbiorców (logi, metryki, UI).
- Reakcje na cykl życia (`ready`, `close`, `error`), strumienie danych.
- Własne „hooki" w bibliotece/frameworku.

## Kiedy unikać

- Prosty przepływ „A woła B" — bezpośrednie wywołanie jest czytelniejsze niż zdarzenie.
- Gdy potrzebujesz gwarancji dostarczenia/kolejności między procesami — to już kolejka
  komunikatów, nie emitter w pamięci.
- Nadużycie zdarzeń robi „spaghetti zdarzeniowe" — trudno prześledzić, co co wywołuje.

## Pułapki

- **Wyciek pamięci przez zapomniane `off`** — słuchacz trzyma domknięcie (i to, co ono
  domyka) przy życiu. Długo żyjący emitter + ciągłe `on` bez `off` = rosnąca pamięć.
- Anonimowy słuchacz (`bus.on("x", () => ...)`) — nie da się go wypisać, bo nie masz
  referencji. Trzymaj funkcję w zmiennej albo zwracaj „unsubscribe".
- Modyfikacja listy słuchaczy w trakcie `emit` (przez `once`/`off`) bez iteracji po kopii
  → pominięci słuchacze.
- Wyjątek w jednym słuchaczu przerywa `emit` dla kolejnych — zdecyduj, czy łapać.
