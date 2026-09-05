# Easy - klasa User

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `User`

Napisz klasę `User` (wzorowaną na przykładach z rozdziałów javascript.info
o składni klas, getterach/setterach i statykach):

- `constructor(name)` - ustawia imię (przez setter, patrz niżej),
- metoda `sayHi()` → `"Cześć, <imię>"`,
- getter/setter `name`: setter odrzuca imiona krótsze niż 2 znaki
  (`throw new RangeError(...)`), wartość trzymaj w polu `_name`,
- statyczna metoda `User.createGuest()` → instancja z imieniem `"Gość"`.

```js
const user = new User("Ala");
user.sayHi();    // "Cześć, Ala"
user.name;       // "Ala" - getter

user.name = "X"; // RangeError - za krótkie
user.name = "Ola";
user.sayHi();    // "Cześć, Ola"

const guest = User.createGuest();
guest.name;              // "Gość"
guest instanceof User;   // true
new User("A");           // RangeError - konstruktor też waliduje (używa settera)
```
