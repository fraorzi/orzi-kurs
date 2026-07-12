# Hard — memoizacja per obiekt (WeakMap jako cache)

Zaimplementuj `memoizeWeak(fn)` — dekorator, który zapamiętuje wynik `fn` dla danego
**obiektu-argumentu** w `WeakMap`. Drugie wywołanie z tym samym obiektem zwraca wynik
z cache, bez ponownego liczenia. Gdy obiekt zostanie zebrany przez GC, jego wpis znika
z cache sam — bez wycieku pamięci (to przewaga WeakMap nad Map w tym wzorcu).

`fn` przyjmuje jeden argument będący **obiektem**.

```js
let calls = 0;
const slow = (obj) => { calls++; return obj.x * 2; };
const fast = memoizeWeak(slow);

const a = { x: 10 };
fast(a); // 20, calls === 1  (policzone)
fast(a); // 20, calls === 1  (z cache — bez liczenia)

const b = { x: 3 };
fast(b); // 6, calls === 2   (nowy obiekt — liczone)
```

Wywołanie z prymitywem (np. `fast(5)`) ma rzucić `TypeError` — klucz WeakMap musi być
obiektem.
