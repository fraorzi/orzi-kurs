# Hard [D] — napraw złożoność O(n²)

`firstDuplicate(arr)` zwraca **pierwszą powtarzającą się** wartość (tę, której drugie
wystąpienie pada najwcześniej, patrząc od lewej), albo `null`, gdy duplikatów nie ma.

Obecna implementacja jest **poprawna, ale wolna** — działa w O(n²), bo dla każdego
elementu przeszukuje całą tablicę. Testy poprawności przejdą; obleje **benchmark
skalowania**. Przepisz funkcję tak, by działała w czasie liniowym O(n) — bez zmiany
kontraktu.

```js
firstDuplicate([2, 1, 3, 5, 3, 2]); // 3  (drugie 3 pada wcześniej niż drugie 2)
firstDuplicate([1, 2, 3]);          // null
firstDuplicate([1, 1]);             // 1
```

Podpowiedź kierunkowa: co da Ci sprawdzanie „czy już widziałem tę wartość" w O(1)?
