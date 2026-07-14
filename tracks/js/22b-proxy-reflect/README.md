# Proxy i Reflect — przechwytywanie operacji

`Proxy` owija obiekt i pozwala przechwycić operacje na nim — odczyt, zapis, `in`, `delete`,
wyliczanie kluczy. `Reflect` to komplet metod odpowiadających tym operacjom, którymi
wygodnie wykonasz „domyślne" zachowanie w środku pułapki.

```js
const target = { a: 1 };
const p = new Proxy(target, {
  get(obj, key, receiver) {
    return Reflect.get(obj, key, receiver); // domyślny odczyt
  },
});
p.a; // 1
```

## Najczęstsze pułapki (traps)

| Pułapka | Przechwytuje | Domyślnik z Reflect |
|---|---|---|
| `get(t, key, recv)` | `p.key` / `p[key]` | `Reflect.get(t, key, recv)` |
| `set(t, key, val, recv)` | `p.key = val` | `Reflect.set(t, key, val, recv)` |
| `has(t, key)` | `key in p` | `Reflect.has(t, key)` |
| `deleteProperty(t, key)` | `delete p.key` | `Reflect.deleteProperty(t, key)` |
| `ownKeys(t)` | `Object.keys`, `for..in` | `Reflect.ownKeys(t)` |

## Po co `Reflect`

- **Poprawny domyślnik.** `Reflect.get(t, key, receiver)` uwzględnia `receiver` — ważne przy
  getterach i dziedziczeniu (zwykłe `t[key]` gubi poprawny `this`).
- **Zwraca sensowną wartość.** `Reflect.set`/`deleteProperty` zwracają `boolean` (sukces),
  co pułapka `set`/`deleteProperty` musi oddać. Zwrot `false` w trybie strict rzuca
  `TypeError` — dlatego zwracaj wynik `Reflect.*`, nie „na czuja" `true`.
- Nazwy metod `Reflect` 1:1 pokrywają się z nazwami pułapek — łatwo pamiętać.

## Typowe zastosowania

- **Wartości domyślne** dla brakujących kluczy (`get`).
- **Walidacja** przy zapisie (`set` rzuca dla złych danych).
- **Reaktywność** — powiadamianie o zmianach (fundament Vue 3, MobX): pułapki `set`/`delete`
  wołają callback.
- Logowanie / instrumentacja dostępu, wirtualne właściwości, ochrona pól.

## Kiedy używać

- Gdy potrzebujesz **jednolitego** zachowania dla dowolnych (też przyszłych) kluczy — czego
  getter/setter na konkretnych polach nie da.
- Reaktywne modele danych, walidowane „obiekty-rekordy", API z wartościami domyślnymi.

## Kiedy unikać

- Na gorących ścieżkach — każda operacja przez Proxy ma **narzut** (nie zoptymalizuje jej
  silnik tak jak zwykłego obiektu).
- Gdy wystarczy zwykły getter/setter albo `Object.defineProperty` na kilku znanych polach —
  Proxy to armata na muchę.

## Pułapki (gotcha)

- Pułapka `set`/`deleteProperty` **musi zwrócić `boolean`**. Zapomnisz — w strict mode
  dostaniesz `TypeError`. Najbezpieczniej: `return Reflect.set(...)`.
- `get` z getterami: użyj `Reflect.get(t, key, receiver)`, żeby `this` w getterze wskazywał
  na proxy, nie na surowy target.
- Proxy **nie jest** targetem — `proxy === target` to `false`. Tożsamość się zmienia.
- Głębokość nie jest darmowa: żeby zagnieżdżone obiekty też były obserwowane, musisz owijać
  je w Proxy przy odczycie (`get`) — jeden Proxy widzi tylko swój poziom.
