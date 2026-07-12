# this, call/apply/bind

`this` NIE jest przypisane do funkcji na stałe — jego wartość zależy od tego,
**jak funkcja została wywołana**:

```js
const user = {
  name: "Ala",
  sayHi() { return `Cześć, ${this.name}`; },
};

user.sayHi();          // "Cześć, Ala" — this = obiekt przed kropką

const fn = user.sayHi;
fn();                  // TypeError — this = undefined (moduły ESM są strict)
```

## Cztery sposoby ustawienia this

1. **Wywołanie przez obiekt**: `obj.method()` → `this === obj`,
2. **Samodzielne wywołanie**: `fn()` → `this === undefined` (w strict mode),
3. **Jawnie**: `fn.call(ctx, a, b)` / `fn.apply(ctx, [a, b])` — jednorazowo,
4. **Na stałe**: `const bound = fn.bind(ctx)` — nowa funkcja z przyspawanym this.

Arrow functions to piąty przypadek: **nie mają własnego this** — biorą je
leksykalnie z miejsca, gdzie zostały zapisane.

## Utrata this

Najczęstszy bug: metoda przekazana jako zwykła funkcja traci obiekt:

```js
setTimeout(user.sayHi, 100);        // this zgubione! przekazujemy samą funkcję
setTimeout(() => user.sayHi(), 100); // OK — wywołanie nadal przez kropkę
setTimeout(user.sayHi.bind(user), 100); // OK — this przyspawane
```

## Forwarding w dekoratorach

Wrapper przezroczysty dla `this` i argumentów używa `apply`:

```js
function logged(fn) {
  return function (...args) {
    return fn.apply(this, args); // this wrappera przechodzi do fn
  };
}
```

## Chaining

Metody zwracające `this` można łączyć w łańcuch:

```js
ladder.up().up().down().getStep();
```

## Kiedy używać

- `bind` do handlerów i callbacków, które mają pamiętać swój obiekt,
- `call`/`apply` w dekoratorach i przy pożyczaniu metod,
- arrow do callbacków wewnątrz metod (this z metody zostaje),
- `return this` w API budowanych na chainingu (buildery).

## Kiedy unikać

- arrow jako **metoda obiektu** — `this` nie będzie obiektem, tylko otoczeniem
  modułu (undefined),
- `bind` w pętli/renderze — każde wywołanie tworzy nową funkcję,
- polegania na `this` w funkcjach pomocniczych — jawny parametr bywa czytelniejszy.

## Pułapki

- `const f = obj.method; f()` — utrata this (patrz wyżej),
- podwójny bind nie działa: `f.bind(a).bind(b)` zawsze użyje `a`,
- arrow nie da się przebindować — `call`/`apply`/`bind` nie zmieniają jej this,
- metoda przekazana do `map`/`forEach` też traci this — to zwykłe przekazanie
  funkcji.
