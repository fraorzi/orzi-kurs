## Hint 1

Cała arytmetyka musi być na BigInt — nie mieszaj z `number`. Akumulator zacznij od `1n`,
a pętlę prowadź po BigInt:

```js
let result = 1n;
for (let i = 2n; i <= BigInt(n); i++) {
  result *= i;
}
return result;
```

`BigInt(n)` konwertuje granicę pętli, żeby porównanie `i <= BigInt(n)` nie mieszało typów.

## Hint 2

`bigPow` możesz zrobić operatorem `**` na BigInt — skonwertuj oba argumenty:

```js
export function bigPow(base, exp) {
  return BigInt(base) ** BigInt(exp);
}
```

Zwykły `Math.pow` odpada — `Math.*` nie działa z BigInt, a `number` i tak zgubiłby precyzję
przy `2 ** 64`.
