## Hint 1

`firstAndLast`: pierwszy element destrukturyzacją `[first]`, ostatni przez
`arr.at(-1)`. `swapped`: destrukturyzacja pary + nowa tablica z odwróconą
kolejnością. `fullName`: destrukturyzuj w nawiasie parametru.

## Hint 2

```js
export function firstAndLast(arr) {
  const [first] = arr;
  return { first, last: arr.at(-1) };
}

export function fullName({ first, last }) {
  return last ? `${first} ${last}` : first;
}
```

`swapped`: `const [a, b] = pair; return [b, a];`
