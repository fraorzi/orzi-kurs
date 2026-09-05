# Hard - rozszerzanie wbudowanych i pola prywatne

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `PowerArray extends Array`

Przykład z javascript.info („Extending built-in classes"):

- metoda `isEmpty()` → czy tablica pusta,
- metoda `first()` → pierwszy element,
- wbudowane metody (`filter`, `map`...) mają zwracać `PowerArray` - to dzieje
  się samo, przetestujesz dlaczego.

```js
const arr = PowerArray.from([1, 2, 5, 10]);
arr.isEmpty();                        // false
const filtered = arr.filter((x) => x >= 5);
filtered instanceof PowerArray;       // true - filter użył this.constructor
filtered.isEmpty();                   // false - wynik też ma nowe metody
```

Uwaga: do budowania z tablicy używaj `PowerArray.from([...])` -
`new Array(4)` (a więc i `new PowerArray(4)`) tworzy tablicę z dziurami,
to klasyczna pułapka konstruktora Array.

## 2. `Wallet` - pola prywatne

Portfel z twardą prywatnością (pola `#`):

- `#balance` - startuje z wartości z konstruktora (domyślnie 0),
- `deposit(amount)` / `withdraw(amount)` - jak w koncie bankowym: kwoty `<= 0`
  → `RangeError`, wypłata ponad stan → `RangeError`; zwracają nowe saldo,
- getter `balance` - jedyny sposób odczytu,
- `#balance` ma być NIEWIDOCZNE z zewnątrz: `Object.keys`, `JSON.stringify`
  i `Object.getOwnPropertyNames` nie mogą go pokazywać.

```js
const w = new Wallet(100);
w.deposit(50);   // 150
w.balance;       // 150
Object.keys(w);  // [] - pole prywatne nie jest właściwością!
w.withdraw(999); // RangeError
```
