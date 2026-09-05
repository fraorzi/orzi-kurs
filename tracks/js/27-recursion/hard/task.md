# Hard - przechodzenie drzewa i szukanie ścieżki

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Węzeł drzewa: `{ value, children }` (`children` to tablica węzłów, może być pusta lub
pominięta). Zaimplementuj dwie funkcje rekurencyjne.

## 1. `flattenTree(node)`

Zwróć tablicę wszystkich `value` w drzewie, w kolejności **pre-order DFS** (najpierw węzeł,
potem kolejno jego poddrzewa).

```js
const tree = {
  value: "a",
  children: [
    { value: "b", children: [{ value: "d" }, { value: "e" }] },
    { value: "c", children: [{ value: "f" }] },
  ],
};
flattenTree(tree); // ["a", "b", "d", "e", "c", "f"]
```

## 2. `findPath(node, target)`

Zwróć tablicę wartości od korzenia do węzła o `value === target`, albo `null`, jeśli nie ma
takiego węzła.

```js
findPath(tree, "e");   // ["a", "b", "e"]
findPath(tree, "f");   // ["a", "c", "f"]
findPath(tree, "a");   // ["a"]
findPath(tree, "zzz"); // null
```
