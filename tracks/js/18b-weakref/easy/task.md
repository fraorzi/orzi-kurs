# Easy — `weakBox`: słaba referencja do obiektu

Zaimplementuj `weakBox(value)` — trzyma `value` (obiekt) przez `WeakRef` i zwraca
`{ get }`, gdzie `get()` zwraca obiekt przez `deref()` (albo `undefined`, jeśli obiekt
został już zebrany przez GC).

```js
const obj = { x: 1 };
const box = weakBox(obj);
box.get(); // obj  — dopóki obj jest gdzieś trzymany
box.get() === obj; // true (ta sama referencja)
```

`WeakRef` przyjmuje wyłącznie obiekty. `get()` ma zwracać dokładnie to, co `deref()` —
pamiętaj, że w innych warunkach może to być `undefined`.
