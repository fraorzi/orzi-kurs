# Easy [D] — napraw błędy off-by-one

W `starter.js` są **dwie kompletne funkcje z błędami „o jeden"**. Nie pisz ich od nowa —
znajdź i popraw pomyłkę w indeksowaniu/warunku pętli, aż testy przejdą.

## 1. `sumTo(n)`

Ma zwrócić sumę liczb od `1` do `n` włącznie.

```js
sumTo(5); // 15  (1+2+3+4+5)
sumTo(1); // 1
sumTo(0); // 0
```

## 2. `last(arr)`

Ma zwrócić ostatni element tablicy.

```js
last([1, 2, 3]); // 3
last(["a"]);     // "a"
```

Obie funkcje „prawie działają" — pomyłka jest w granicy zakresu. Uruchom testy
i przeczytaj, które wartości się nie zgadzają.
