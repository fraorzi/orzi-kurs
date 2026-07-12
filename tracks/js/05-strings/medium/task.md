# Medium — transformacje

Zaimplementuj w `starter.js` trzy funkcje (dwie pierwsze to zadania
z javascript.info).

## 1. `truncate(str, maxlength)`

Jeśli `str` jest dłuższy niż `maxlength` — utnij i zakończ znakiem `"…"`
(jeden znak Unicode), tak by **całość** miała dokładnie `maxlength` znaków.
Krótsze stringi bez zmian.

```js
truncate("Co ja chciałem powiedzieć...", 10); // "Co ja chc…"
truncate("Cześć", 10);                        // "Cześć"
```

## 2. `camelize(str)`

Zamienia string-z-myślnikami na camelCase: każde słowo po myślniku zaczyna się
wielką literą. Wiodący myślnik daje wielką literę na początku.

```js
camelize("background-color");    // "backgroundColor"
camelize("list-style-image");    // "listStyleImage"
camelize("-webkit-transition");  // "WebkitTransition"
```

## 3. `maskCard(cardNumber)`

Maskuje numer karty: wszystkie znaki poza ostatnimi czterema zastąpione `"*"`.
Długość wyniku = długość wejścia (wzorzec z przykładu MDN `padStart`).

```js
maskCard("1234567899874106"); // "************4106"
maskCard("4106");             // "4106"
```
