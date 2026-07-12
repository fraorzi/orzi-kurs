# Easy — łańcuch w praktyce

## 1. `createWithDefaults(defaults, own)`

Zwraca obiekt, którego **prototypem** jest `defaults`, z przekopiowanymi
własnymi właściwościami z `own`. Odczyt nieistniejącej własnej właściwości
ma spadać do `defaults`.

```js
const defaults = { theme: "dark", lang: "pl" };
const config = createWithDefaults(defaults, { lang: "en" });

config.lang;                     // "en" — własna
config.theme;                    // "dark" — z prototypu
Object.hasOwn(config, "theme");  // false!
```

## 2. `readSource(obj, key)`

Skąd pochodzi właściwość? Zwróć:

- `"own"` — obiekt ma ją jako własną,
- `"inherited"` — jest w łańcuchu prototypów, ale nie własna,
- `"missing"` — nie ma jej wcale.

```js
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;

readSource(rabbit, "jumps"); // "own"
readSource(rabbit, "eats");  // "inherited"
readSource(rabbit, "flies"); // "missing"

rabbit.eats = false;         // zapis tworzy własną kopię...
readSource(rabbit, "eats");  // "own" — ...a prototyp zostaje nietknięty
```
