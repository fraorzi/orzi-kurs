# Iteratory i iterables

`for..of`, spread `[...x]`, destrukturyzacja i `Array.from` działają na **iterables** —
obiektach, które umieją zwrócić iterator. To jeden protokół stojący za tablicami,
stringami, `Map`, `Set`. Zrozumienie go pozwala robić własne, także **leniwe** i
**nieskończone** kolekcje — bez generatorów (te są w następnym zagadnieniu).

## Dwa protokoły

**Iterable** — obiekt z metodą `[Symbol.iterator]()`, która zwraca iterator:

```js
const iterable = {
  [Symbol.iterator]() {
    return iterator;
  },
};
```

**Iterator** — obiekt z metodą `next()` zwracającą `{ value, done }`:

```js
const iterator = {
  next() {
    return { value: 1, done: false }; // done: true kończy iterację
  },
};
```

`for..of` woła `[Symbol.iterator]()` raz, potem `next()` w kółko aż do `done: true`.
Wartość z `{ value, done: true }` jest **pomijana** przez `for..of`.

## Przykład: iterowalny range

```js
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

[...range];           // [1, 2, 3]
for (const n of range) {} // 1, 2, 3
Array.from(range);    // [1, 2, 3]
```

Ważne: stan (`current`) trzymaj **w iteratorze zwracanym przez `[Symbol.iterator]`**,
nie w samym iterable — dzięki temu każda iteracja startuje od nowa i można iterować
wielokrotnie.

## Kto konsumuje iterables

- `for..of`,
- spread: `[...iterable]`, `f(...iterable)`,
- destrukturyzacja: `const [a, b] = iterable`,
- `Array.from(iterable)`,
- konstruktory `new Set(iterable)`, `new Map(iterable)`.

## Leniwość i nieskończoność

Iterator liczy wartości **na żądanie** — dopiero gdy ktoś zawoła `next()`. Dzięki temu
iterable może być nieskończony (np. kolejne liczby naturalne), a konsument bierze tylko
tyle, ile potrzebuje:

```js
function take(iterable, n) {
  const it = iterable[Symbol.iterator]();
  const out = [];
  while (out.length < n) {
    const { value, done } = it.next();
    if (done) break;
    out.push(value);
  }
  return out;
}
```

Uwaga: `[...nieskończony]` się zawiesi — nieskończone iterable konsumuj tylko leniwie
(`take`, `for..of` z `break`).

## Iterable vs array-like

- **Array-like** ma `length` i indeksy (`arr[0]`), ale niekoniecznie `[Symbol.iterator]`
  (np. stary `arguments`, kolekcje DOM w części przeglądarek).
- **Iterable** ma `[Symbol.iterator]`, ale niekoniecznie `length`.
- `Array.from` ogarnia **oba**; spread `[...x]` wymaga iterable.

## Kiedy używać

- Własna struktura danych, po której chcesz robić `for..of`/spread (lista, drzewo, kolejka).
- Sekwencje leniwe/nieskończone (strumień id, generator zakresów) bez materializacji tablicy.
- Ujednolicenie API: gdy funkcja przyjmuje „coś iterowalnego", działa i na tablicy, i na Set.

## Kiedy unikać

- Zwykła kolekcja, którą i tak trzymasz w tablicy — nie owijaj jej w custom iterator
  bez potrzeby.
- Gdy wystarczy generator (`function*`) — jest krótszy i mniej błędogenny niż ręczny
  `next()` (patrz następne zagadnienie).

## Pułapki

- Stan w samym iterable zamiast w iteratorze → druga iteracja zaczyna od miejsca, gdzie
  skończyła pierwsza (albo w ogóle nie działa ponownie).
- Zapomniane `done: true` → nieskończona pętla.
- `{ value, done: true }` — `for..of` **nie** wyda tej wartości; ostatni sensowny element
  musi mieć `done: false`.
- Spread na nieskończonym iterable zawiesza program.
- `[Symbol.iterator]` to **metoda pod kluczem-symbolem**, nie zwykła nazwa — używaj
  nawiasów kwadratowych.
