# Easy - delay i promisify

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `delay(ms)`

Zwraca promise, który rozwiązuje się (bez wartości) po `ms` milisekundach.

```js
delay(1000).then(() => console.log("po sekundzie"));
```

## 2. `promisify(f)`

Przyjmuje funkcję w stylu node'owym - `f(...args, callback)`, gdzie callback ma
sygnaturę `(err, result)` - i zwraca jej wersję promisową:

- callback dostał `err` → promise odrzucony z `err`,
- callback dostał `(null, result)` → promise rozwiązany z `result`.

```js
function loadFile(name, cb) {
  if (name === "missing") cb(new Error("not found"));
  else cb(null, `content of ${name}`);
}

const loadFileAsync = promisify(loadFile);
await loadFileAsync("a.txt"); // "content of a.txt"
await loadFileAsync("missing"); // rzuca Error("not found")
```
