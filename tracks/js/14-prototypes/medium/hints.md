## Hint 1

`Queue`: w konstruktorze tylko stan (`this.items = [...initial]`); metody
dopisz PO deklaracji funkcji jako `Queue.prototype.enqueue = function (x)
{...}` (zwykłe funkcje — potrzebują this). `myObjectCreate`: zadeklaruj pustą
funkcję, podmień jej `prototype` na `proto`, zwróć `new` z niej.

## Hint 2

```js
export function myObjectCreate(proto) {
  if (typeof proto !== "object" || proto === null) {
    throw new TypeError("proto musi być obiektem");
  }
  function Temp() {}
  Temp.prototype = proto;
  return new Temp();
}
```

Dlaczego działa: `new Temp()` ustawia `[[Prototype]]` nowego obiektu na
`Temp.prototype`, a tam podstawiliśmy `proto`.
