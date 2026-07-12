## Hint 1

Obie funkcje zwracają literał obiektu z metodami skrótowymi (`read(a, b) {...}`,
nie arrow!). Wewnątrz metod stan zapisujesz i czytasz przez `this.a`, `this.b`,
`this.step`.

## Hint 2

Chaining: na końcu `up()` i `down()` dodaj `return this;`. Uwaga: gdybyś użył
arrow functions jako metod, `this` nie byłoby obiektem — dlatego metody piszemy
składnią skrótową.
