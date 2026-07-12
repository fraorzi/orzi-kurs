## Hint 1

`min`: porównaj `a < b` i zwróć odpowiedni argument (if albo operator `?:`).
`pow`: zacznij od `result = 1` i w pętli pomnóż przez `x` dokładnie `n` razy.
`greet`: wartość domyślną deklaruje się w sygnaturze — `greeting = "Cześć"`.

## Hint 2

```js
return a < b ? a : b;               // min

let result = 1;                     // pow
for (let i = 0; i < n; i++) result *= x;

function greet(name, greeting = "Cześć") {
  return `${greeting}, ${name}!`;   // template literal: backticki i ${...}
}
```
