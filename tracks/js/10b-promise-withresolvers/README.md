# `Promise.withResolvers` i wzorzec deferred

Zwykle promisę tworzysz z **executorem** — funkcją, która dostaje `resolve`/`reject`
i sama decyduje, kiedy je wywołać:

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("gotowe"), 100);
});
```

Ale czasem chcesz rozstrzygnąć promisę **z zewnątrz**, z zupełnie innego miejsca w kodzie —
np. gdy przyjdzie zdarzenie, callback albo dane od innego komponentu. Kiedyś robiło się to
brzydkim hackiem: deklarowało zmienne i „wyciekało" z nich `resolve`/`reject` poza executor:

```js
let resolve, reject;
const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
// teraz resolve/reject można wywołać gdziekolwiek
```

## `Promise.withResolvers()` (ES2024)

Robi dokładnie to, ale czysto — zwraca obiekt z gotowymi `promise`, `resolve` i `reject`:

```js
const { promise, resolve, reject } = Promise.withResolvers();

promise.then((v) => console.log("dostałem", v));
resolve(42); // "dostałem 42" — rozstrzygnięte z zewnątrz
```

To trójka „deferred" (odroczonej promisy): sama promisa plus uchwyty do jej rozstrzygnięcia.

## Do czego to służy

- **Most callback/zdarzenie → promise** — utwórz deferred, w callbacku wywołaj `resolve`.
- **Bramka/sygnał** — kod czeka na `await gate`, a inne miejsce woła `open()`.
- **Kolejka producent–konsument** — `pull()` zwraca promisę czekającą na najbliższy `push()`.

## Semantyka, o której warto pamiętać

- `resolve`/`reject` można wołać wiele razy, ale liczy się **tylko pierwsze** — promisa
  rozstrzyga się raz i już (kolejne wywołania są ignorowane).
- Rozstrzygnięcie jest zawsze asynchroniczne: `.then` odpali się w mikrozadaniu, nie od razu.
- `resolve(anotherPromise)` „przykleja się" do tamtej promisy (przyjmuje jej wynik).

## Kiedy używać

- Gdy moment rozstrzygnięcia jest **poza** miejscem tworzenia promisy (zdarzenia, sygnały,
  kolejki, ręczne sterowanie z testów).

## Kiedy unikać

- Gdy wystarczy zwykły executor (`new Promise((resolve) => …)`) albo `async` funkcja —
  nie owijaj w deferred logiki, która i tak jest lokalna. Deferred rozprasza kontrolę
  (rozstrzygnięcie „gdzieś indziej"), więc używaj go tylko, gdy naprawdę tego potrzebujesz.

## Pułapki

- Trzymając `resolve`/`reject`, ale nigdy ich nie wołając, zostawiasz promisę **wiszącą
  na zawsze** — `await` na niej nie wróci (potencjalny wyciek). Zadbaj, by każdy deferred
  na końcu został rozstrzygnięty albo odrzucony.
- Deferred, którego nikt nie `await`-uje i który odrzucisz, może dać `unhandledrejection`.
