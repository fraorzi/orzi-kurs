# Proces, argumenty i konfiguracja

Proces Node dostaje wejście z trzech miejsc: argumenty CLI (`process.argv`),
zmienne środowiskowe (`process.env`) i stdin. Wszystkie są **stringami bez
gwarancji poprawności** — to granica zaufania, tak samo jak request HTTP.

Model mentalny: konfigurację waliduj **raz, na starcie, na granicy** i zamień na
niemutowalny obiekt o konkretnych typach. Reszta programu dostaje gotowy config
i nigdy nie sięga po `process.env` bezpośrednio. Dzięki temu:

- błędna konfiguracja ubija proces natychmiast z czytelnym komunikatem, zamiast
  wybuchać po godzinie w losowym miejscu,
- typy przestają kłamać (`PORT` to `number`, nie `string | undefined`),
- testy nie muszą mutować globalnego `process.env`.

## Argumenty CLI

`process.argv` to surowa tablica; od Node 18 jest wbudowany `util.parseArgs` do
deklaratywnego parsowania. W obu podejściach kontrakt jest ten sam: jawna lista
znanych opcji, walidacja wartości, twardy błąd dla nieznanych flag — literówka
w fladze ma być błędem, nie cichym zignorowaniem.

## Diagnostyka bez wycieków

Snapshot konfiguracji w logach czy endpointach diagnostycznych musi redagować
sekrety. Konwencja z tego zadania — filtr po nazwie klucza
(`token|secret|password|key`) — to minimum, które łapie większość wycieków
zanim trafią do systemu logów.

## Kiedy używać

- Start każdej usługi i narzędzia CLI: jedna funkcja `loadConfig(env)` na granicy.
- Wszędzie tam, gdzie config trafia do logów, crash reportów albo `/debug`.

## Kiedy unikać

- Nie czytaj `process.env` głęboko w logice domenowej — to ukryta zależność
  globalna, której nie widać w sygnaturze.
- Nie akceptuj nieznanych flag CLI "na wszelki wypadek".
- Nie loguj surowego `process.env` nawet na dev.

## Pułapki

- `Number("")` to `0`, a `Number(undefined)` to `NaN` — waliduj
  `Number.isInteger`/zakres, nie sam cast.
- `Object.freeze` jest płytki; zagnieżdżone obiekty configu mrożysz osobno.
- W produkcji wymagania są ostrzejsze (długość sekretu, wymagane URL-e) —
  rozgałęzienie po `NODE_ENV` należy do walidatora, nie do logiki.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [process](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html)
- [util.parseArgs](https://nodejs.org/download/release/latest-v24.x/docs/api/util.html#utilparseargsconfig)
