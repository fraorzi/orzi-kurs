# Hard — `WeakValueMap`: mapa o słabo trzymanych wartościach

Zaimplementuj `createWeakValueMap()` — mapę `klucz → obiekt`, w której **wartości** trzymane
są słabo (przez `WeakRef`), a wpisy po zebranych obiektach są automatycznie usuwane przez
`FinalizationRegistry`. To wzorzec „weak value cache": klucz (np. string/id) jest zwykły,
ale wartość może zniknąć, gdy nikt jej już nie trzyma — bez wycieku wpisów.

Zwróć `{ set, get, has }`:

- `set(key, value)` — zapisuje `WeakRef(value)` pod `key` i rejestruje `value` w rejestrze
  sprzątającym (held value = `key`),
- `get(key)` — zwraca obiekt (`deref()`) albo `undefined`, gdy brak wpisu lub zebrany,
- `has(key)` — `true`, gdy pod `key` jest jeszcze osiągalny obiekt.

```js
const m = createWeakValueMap();
const user = { id: 10, name: "Ala" };
m.set("u10", user);
m.get("u10");  // user  (dopóki user jest trzymany)
m.has("u10");  // true
m.get("brak"); // undefined
```

Uwaga: w callbacku rejestru usuwaj wpis tylko wtedy, gdy nadal wskazuje na zebrany obiekt
(nie skasuj przypadkiem świeżego wpisu dodanego pod tym samym kluczem po ponownym `set`).
