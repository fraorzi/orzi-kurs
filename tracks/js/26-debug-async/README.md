# Błędy asynchroniczności

Zagadnienie debugowe: startery zawierają kompletny, ale błędny kod asynchroniczny
z kanonu najczęstszych pomyłek. Znajdź i napraw, aż testy przejdą.

## Brakujący await

`await` „rozpakowuje" obietnicę. Bez niego trzymasz **obietnicę**, nie wartość:

```js
async function loadName(fetchUser) {
  const user = fetchUser(); // BUG: to Promise, nie user
  return user.name;         // undefined
}
// naprawa: const user = await fetchUser();
```

Objaw: `undefined`, `[object Promise]` w stringu, `x is not a function` na wyniku.

## forEach + async nie czeka

`Array.prototype.forEach` **ignoruje** zwracane obietnice — nie poczeka na callbacki
`async`. Funkcja zwróci wynik, zanim cokolwiek się policzy:

```js
async function processAll(items, asyncFn) {
  const results = [];
  items.forEach(async (item) => {
    results.push(await asyncFn(item)); // te awaity nikt nie czeka
  });
  return results; // BUG: [] — forEach już wrócił
}
```

Naprawa: pętla `for..of` z `await` (sekwencyjnie) albo `Promise.all(items.map(asyncFn))`
(równolegle).

## map(async ...) zwraca tablicę obietnic

`items.map(async ...)` daje **tablicę obietnic**, nie wartości. Trzeba ją „zebrać"
przez `Promise.all`:

```js
async function mapAsync(items, asyncFn) {
  return items.map(async (item) => await asyncFn(item)); // BUG: Promise[]
}
// naprawa: return Promise.all(items.map(asyncFn));
```

## Sekwencyjny await zamiast równoległego

`await` w pętli czeka na **każdy** krok przed następnym — niezależne operacje robią się
seryjnie, wielokrotnie wolniej:

```js
for (const id of ids) {
  results.push(await fetchOne(id)); // każde czeka na poprzednie
}
// naprawa (gdy niezależne): const results = await Promise.all(ids.map(fetchOne));
```

Sekwencyjnie jest OK, gdy krok **zależy** od poprzedniego albo chcesz ograniczyć obciążenie.
Gdy operacje są niezależne — `Promise.all` puszcza je równolegle.

## Kiedy sekwencyjnie, kiedy równolegle

- **Równolegle** (`Promise.all`): niezależne pobrania/zapisy — szybciej.
- **Sekwencyjnie** (`for..of` + `await`): każdy krok zależy od wyniku poprzedniego, albo
  celowo ograniczasz współbieżność.
- `Promise.all` **odrzuca** przy pierwszym błędzie; gdy chcesz wszystkie wyniki mimo
  błędów — `Promise.allSettled`.

## Kiedy unikać

- Nie zamieniaj mechanicznie każdej pętli z `await` na `Promise.all`; zależności i limity
  API mogą wymagać kolejności albo poola.
- Nie dodawaj `await` wyłącznie po to, by uciszyć test, jeśli kontrakt ma zwracać Promise.
- Nie pozostawiaj „fire and forget" bez jawnej obsługi odrzucenia i obserwowalności.

## Pułapki (jak szukać)

- Wynik to `Promise`/`undefined` mimo `async` → sprawdź, czy nie brakuje `await`.
- „Kod za pętlą wykonał się za wcześnie" → `forEach(async ...)` albo brak `await` na `map`.
- „Działa, ale wolno przy wielu elementach" → sekwencyjny `await` w pętli, którego dało
  się zrównoleglić.
- Uruchom test i przeczytaj, co realnie zwraca funkcja (wartość vs obietnica vs pusto).
