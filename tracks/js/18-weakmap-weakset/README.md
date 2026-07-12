# WeakMap i WeakSet

`WeakMap` i `WeakSet` to kuzyni `Map`/`Set`, ale z **słabymi** referencjami do kluczy.
Jeśli obiekt-klucz nie jest trzymany nigdzie indziej, garbage collector może go usunąć
— a wtedy jego wpis znika z WeakMap/WeakSet automatycznie. To rozwiązuje wycieki pamięci
przy dowiązywaniu danych do obiektów.

## Kluczowe ograniczenia

```js
const wm = new WeakMap();
wm.set({}, 1);        // OK — klucz musi być OBIEKTEM
wm.set("str", 1);     // TypeError: Invalid value used as weak map key
```

(Ściśle: od ES2023 kluczem może być też **niezarejestrowany symbol** — jedyny prymityw
o unikalnej tożsamości. W praktyce kluczami są obiekty; stringi i liczby zawsze rzucają.)

WeakMap/WeakSet **nie mają**:
- `size`,
- iteracji (`keys`/`values`/`entries`/`forEach`, `for..of`),
- `clear`.

Powód: GC działa w nieprzewidywalnym momencie, więc liczba żyjących elementów jest
nieokreślona. Dostępne są tylko: WeakMap — `get`/`set`/`has`/`delete`; WeakSet —
`add`/`has`/`delete`.

## Wzorzec: flaga „widziane" (WeakSet)

Śledź, które obiekty zostały przetworzone, bez modyfikowania ich samych. Gdy obiekt
zniknie z głównej kolekcji, jego flaga też zniknie z pamięci:

```js
const read = new WeakSet();
read.add(message);      // oznacz jako przeczytane
read.has(message);      // true
```

## Wzorzec: dane poboczne (WeakMap)

Dowiąż metadane do cudzych obiektów, których nie chcesz (albo nie możesz) zmieniać:

```js
const readDate = new WeakMap();
readDate.set(message, new Date()); // kiedy przeczytano
readDate.get(message);             // Date albo undefined
```

## Wzorzec: dane prywatne klasy (WeakMap)

Trzymaj prywatny stan poza obiektem — nie da się go odczytać przez `Object.keys`
ani zserializować przez `JSON.stringify`:

```js
const _balance = new WeakMap();
class Account {
  constructor(balance) {
    _balance.set(this, balance);
  }
  get balance() {
    return _balance.get(this);
  }
}
Object.keys(new Account(100)); // [] — balance nie jest polem instancji
```

(Dziś do prywatności służą też pola `#private`; WeakMap to starszy, wciąż używany wzorzec,
przydatny np. gdy chcesz mieć dostęp do prywatnych danych spoza instancji.)

## Wzorzec: cache/memoizacja per obiekt (WeakMap)

Zapamiętuj wynik kosztownej funkcji dla danego obiektu-argumentu. Gdy obiekt zostanie
zebrany przez GC, wpis cache znika sam — zero wycieku:

```js
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavy(obj);
  cache.set(obj, result);
  return result;
}
```

## Kiedy używać

- Metadane/cache **kluczowane obiektem**, które mają żyć tak długo jak obiekt.
- Prywatny stan powiązany z instancją.
- Śledzenie „widzianych" obiektów (np. wykrywanie cykli, odwiedzone węzły) bez trzymania
  ich przy życiu.

## Kiedy unikać

- Klucze prymitywne (string/number) — WeakMap ich nie przyjmie; użyj `Map`.
- Potrzebujesz iteracji, `size` albo wyczyszczenia całości → `Map`/`Set`.
- Musisz zserializować zawartość → WeakMap się nie iteruje, więc nie zserializujesz.
- Cache z limitem (LRU) — potrzebujesz kolejności i rozmiaru → `Map`.

## Pułapki

- Klucz musi być obiektem (wyjątek ES2023: niezarejestrowany symbol) — pozostałe
  prymitywy rzucają `TypeError`.
- Nie da się „policzyć" wpisów ani po nich przejść — jeśli tego potrzebujesz, to znak,
  że chcesz `Map`.
- Słaba referencja dotyczy **klucza**, nie wartości: dopóki żyje klucz, wartość też żyje.
- Nie kontrolujesz, **kiedy** GC posprząta — nie buduj logiki na „znikaniu" wpisów
  w konkretnym momencie.
