# Hard - wzorzec observe (akcesory + defineProperty)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `observable(target, onChange)` - funkcję, która zwraca **nowy** obiekt
o tych samych kluczach co `target`, ale każdy klucz jest parą getter/setter zdefiniowaną
przez `Object.defineProperty`. Zapis pod klucz, który **zmienia** wartość, wywołuje
`onChange(key, newValue, oldValue)`. To rdzeń reaktywności (Vue 2, MobX robią podobnie).

## Wymagania

- odczyt zwraca aktualną wartość,
- zapis **innej** wartości: aktualizuje stan i woła `onChange(key, newValue, oldValue)`,
- zapis **tej samej** wartości (`===`): nie woła `onChange`,
- klucze są enumerowalne (`Object.keys` zwraca je i widzi aktualne wartości),
- oryginalny `target` nie jest mutowany.

```js
const changes = [];
const state = observable({ count: 0, name: "x" }, (key, val, old) => {
  changes.push(`${key}: ${old} -> ${val}`);
});

state.count;        // 0
state.count = 1;    // changes: ["count: 0 -> 1"]
state.count = 1;    // bez zmiany - onChange NIE wywołany
state.name = "y";   // changes: ["count: 0 -> 1", "name: x -> y"]
Object.keys(state); // ["count", "name"]
```
