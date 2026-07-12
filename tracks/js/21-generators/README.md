# Generatory

Generator (`function*`) to najprostszy sposób na napisanie iteratora. Zamiast ręcznie
budować obiekt z `next()` i `{ value, done }`, piszesz zwykły kod z `yield` — silnik sam
robi z tego iterator (i zarazem iterable). Generatory są **leniwe**: kod wykonuje się
kawałkami, dopiero gdy ktoś poprosi o kolejną wartość.

## Podstawy: function* i yield

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }

[...gen()];          // [1, 2, 3] — generator jest iterable
for (const x of gen()) {} // 1, 2, 3
```

`yield` „pauzuje" funkcję i oddaje wartość. Następny `next()` wznawia od miejsca pauzy.

## Leniwość

Kod między `yield`-ami wykonuje się dopiero, gdy poprosisz o wartość. Dlatego generator
może reprezentować **nieskończoną** sekwencję — konsument bierze tylko tyle, ile chce:

```js
function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}
```

`[...naturals()]` by się zawiesiło; bierz leniwie (`for..of` z `break`, operator `take`).

## Delegacja: yield*

`yield*` „przekazuje" iterację do innego iterable/generatora — wydaje wszystkie jego
wartości. Idealne do rekurencji i łączenia:

```js
function* flatten(arr) {
  for (const x of arr) {
    if (Array.isArray(x)) yield* flatten(x); // wejdź w podtablicę
    else yield x;
  }
}
[...flatten([1, [2, [3]]])]; // [1, 2, 3]
```

## Komunikacja dwukierunkowa: next(arg)

`yield` jest też **wyrażeniem** — wartość przekazana do `next(arg)` staje się wynikiem
`yield` przy wznowieniu. Pierwsze `next()` tylko uruchamia generator do pierwszego `yield`
(jego argument jest ignorowany):

```js
function* accumulator() {
  let total = 0;
  while (true) {
    const x = yield total; // x = to, co przekazano do next()
    total += x;
  }
}
const acc = accumulator();
acc.next();      // { value: 0 }   — priming, argument pomijany
acc.next(10);    // { value: 10 }
acc.next(5);     // { value: 15 }
```

## Kiedy używać

- Tworzenie iteratora dla własnej struktury — krócej i bezpieczniej niż ręczny `next()`.
- Leniwe/nieskończone sekwencje (id, strumienie, paginacja).
- Rekurencyjne przechodzenie (drzewa, zagnieżdżone struktury) z `yield*`.
- Leniwe „operatory" (`map`/`filter`/`take` na iterables) składane w pipeline.

## Kiedy unikać

- Gdy dane i tak mieszczą się w tablicy i robisz na nich jedno przejście — zwykłe metody
  tablic są czytelniejsze.
- Gorące pętle o krytycznej wydajności — generator ma narzut na `next()`/obiekty wyniku;
  ręczna pętla bywa szybsza.
- Async — do strumieni asynchronicznych służą **async generatory** (`async function*`,
  osobne zagadnienie), nie zwykłe.

## Pułapki

- Zapomniana `*` — `function gen()` bez gwiazdki to zwykła funkcja, `yield` rzuci błąd.
- Wywołanie `gen` **tworzy** generator, ale nie uruchamia kodu — nic się nie dzieje aż
  do pierwszego `next()`/`for..of`.
- Argument **pierwszego** `next()` jest ignorowany (nie ma zawieszonego `yield`, do którego
  by trafił).
- Generator jest jednorazowy — po wyczerpaniu (`done: true`) nie wraca; potrzebujesz nowego.
- `yield` vs `yield*`: `yield [1,2]` wyda **tablicę** jako jeden element; `yield* [1,2]`
  wyda `1`, potem `2`.
