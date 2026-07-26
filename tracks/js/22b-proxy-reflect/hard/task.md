# Hard — głęboki `observable` (reaktywność)

Zaimplementuj `observable(target, onChange)` — zwraca `Proxy`, który przy **każdej zmianie**
(zapis, `delete`) woła `onChange(path, value)`. To fundament reaktywności (Vue 3, MobX).

- `path` to ścieżka zmienionego klucza jako string, np. `"count"`, `"user.name"`, `"tags.1"`.
- `value` to nowa wartość (przy `delete` → `undefined`).
- **Głębokość:** zagnieżdżone obiekty też muszą być obserwowane. Zmiana `obj.user.name`
  ma wywołać `onChange("user.name", ...)`, nie tylko na najwyższym poziomie.

```js
const changes = [];
const state = observable({ user: { name: "a" }, count: 0 }, (p, v) => changes.push([p, v]));

state.count = 5;         // onChange("count", 5)
state.user.name = "bob"; // onChange("user.name", "bob")
delete state.user.name;  // onChange("user.name", undefined)

changes; // [["count", 5], ["user.name", "bob"], ["user.name", undefined]]
```

Pułapki mutujące muszą przestrzegać kontraktu Proxy i zwracać `boolean`. Klucze będące
symbolami pomiń w budowaniu tekstowej ścieżki.
