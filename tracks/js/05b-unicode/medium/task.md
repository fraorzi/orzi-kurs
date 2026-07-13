# Medium — odwracanie i normalizacja

## 1. `reverse(str)`

Odwraca kolejność znaków, **nie rozrywając** par zastępczych. Klasyczny
`str.split("").reverse().join("")` psuje emoji — Twoja wersja ma działać.

```js
reverse("hello");  // "olleh"
reverse("a😀b");   // "b😀a"   (nie "b�?a" z rozbitym emoji)
```

## 2. `equalIgnoringForm(a, b)`

Zwraca `true`, jeśli napisy są równe **po normalizacji do formy NFC**. Ten sam znak
diakrytyczny bywa zapisany jako jeden punkt kodowy albo litera + znak łączący; wizualnie
są identyczne, ale `===` je rozróżnia.

```js
equalIgnoringForm("é", "é"); // true  — obie formy "é"
equalIgnoringForm("abc", "abc");        // true
equalIgnoringForm("a", "b");            // false
```
