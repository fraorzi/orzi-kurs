# Hard — własny bind i dekorator delay

## 1. `myBind(fn, ctx, ...preset)`

Własna implementacja `Function.prototype.bind` (wg opisu z MDN): zwraca nową
funkcję, która wywołuje `fn` z `this = ctx` i argumentami `preset` doklejonymi
przed argumentami wywołania.

Poza zakresem zadania: współpraca z `new` (prawdziwy bind ją ma — tu pomijamy).

```js
function greet(greeting, punct) {
  return `${greeting}, ${this.name}${punct}`;
}
const ala = { name: "Ala" };

const greetAla = myBind(greet, ala, "Cześć");
greetAla("!"); // "Cześć, Ala!"

// "podwójny bind" nie działa — jak w oryginale:
const rebound = myBind(greetAla, { name: "Bob" });
rebound("?"); // "Cześć, Ala?" — ctx z pierwszego wiązania wygrywa
```

## 2. `delay(fn, ms)`

Dekorator z javascript.info („Delaying decorator"): zwraca wrapper, który
wywołuje `fn` po `ms` milisekundach, przekazując **this i wszystkie argumenty**.

```js
const log = delay(console.log, 1000);
log("test"); // "test" w konsoli po sekundzie

const obj = {
  value: 42,
  show: delay(function () { record(this.value); }, 500),
};
obj.show(); // po 500 ms record(42) — this przechodzi przez wrapper
```
