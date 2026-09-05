# Medium - gettery i settery (właściwości obliczane)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwie fabryki obiektów z **akcesorami** (get/set).

## 1. `createUser(name, surname)`

Zwróć obiekt z polami `name`, `surname` oraz akcesorem `fullName`:

- odczyt `fullName` → `` `${name} ${surname}` ``,
- zapis `fullName = "Jan Nowak"` → rozbija na `name = "Jan"`, `surname = "Nowak"`.

(Przykład `fullName` z javascript.info.)

```js
const u = createUser("Ala", "Kowalska");
u.fullName;          // "Ala Kowalska"
u.fullName = "Jan Nowak";
u.name;              // "Jan"
u.surname;           // "Nowak"
```

## 2. `createTemperature(celsius)`

Zwróć obiekt z polem `celsius` oraz akcesorem `fahrenheit`:

- odczyt `fahrenheit` → `celsius * 9/5 + 32`,
- zapis `fahrenheit = F` → ustawia `celsius = (F - 32) * 5/9`.

```js
const t = createTemperature(100);
t.fahrenheit;        // 212
t.fahrenheit = 32;
t.celsius;           // 0
```
