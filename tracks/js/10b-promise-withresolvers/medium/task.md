# Medium — bramka (gate) rozstrzygana z zewnątrz

Zaimplementuj `createGate()` — jednorazową bramkę, na którą kod czeka, a inne miejsce ją
otwiera. Zwraca `{ opened, open, fail }`:

- `opened` — promisa, na której można `await`-ować (dowolnie wiele razy, z wielu miejsc),
- `open(value)` — otwiera bramkę: rozstrzyga `opened` wartością `value`,
- `fail(error)` — zamyka bramkę błędem: odrzuca `opened`.

```js
const gate = createGate();

async function worker(name) {
  const v = await gate.opened; // czeka, aż ktoś otworzy
  return `${name}:${v}`;
}

const a = worker("a");
const b = worker("b");
gate.open("go");
await Promise.all([a, b]); // ["a:go", "b:go"] — oba czekające ruszają
```

Bramka jest jednorazowa: `await gate.opened` już po otwarciu zwraca wartość natychmiast.
Użyj `Promise.withResolvers()` — moment otwarcia jest poza miejscem utworzenia promisy.
