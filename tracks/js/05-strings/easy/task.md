# Easy — podstawowe operacje

Zaimplementuj w `starter.js` trzy funkcje (dwie pierwsze to zadania
z javascript.info).

## 1. `ucFirst(str)`

Zwraca string z pierwszą literą wielką. Pusty string → pusty string.

```js
ucFirst("jan");  // "Jan"
ucFirst("");     // ""
```

## 2. `checkSpam(str)`

Czy string zawiera `"viagra"` lub `"XXX"` — niezależnie od wielkości liter?

```js
checkSpam("buy ViAgRA now"); // true
checkSpam("free xxxxx");     // true
checkSpam("innocent rabbit"); // false
```

## 3. `initials(fullName)`

Inicjały: pierwsza litera każdego słowa, wielka, sklejone. Odporna na
wielokrotne spacje i spacje na brzegach.

```js
initials("jan maria kowalski"); // "JMK"
initials("  ala   nowak ");     // "AN"
```
