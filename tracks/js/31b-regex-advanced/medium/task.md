# Medium - escapowanie danych i grupy nazwane

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `highlight(text, query)`

Otocz **każde** dosłowne wystąpienie `query` w `text` znacznikami `[[ ]]`, bez rozróżniania
wielkości liter. `query` może zawierać metaznaki regex (`.`, `(`, `*`…) - muszą być
traktowane **dosłownie**, więc zescapuj je przed zbudowaniem `RegExp`.

```js
highlight("cost 3.5 and 3x5", "3.5"); // "cost [[3.5]] and 3x5"  (kropka dosłowna, nie „dowolny znak")
highlight("call f(x) now", "f(x)");   // "call [[f(x)]] now"
highlight("Cat cat CAT", "cat");      // "[[Cat]] [[cat]] [[CAT]]"
highlight("abc", "");                 // "abc"   (pusty query → bez zmian)
```

Zachowaj oryginalną wielkość liter w tym, co otaczasz (użyj funkcji zamiany).

## 2. `reformatDate(str)`

Zamień datę `RRRR-MM-DD` na `DD/MM/RRRR`, używając **grup nazwanych** i `$<name>` w stringu
zamiany.

```js
reformatDate("2024-07-14"); // "14/07/2024"
reformatDate("spotkanie 2024-01-05 rano"); // "spotkanie 05/01/2024 rano"
```

Nazwij osobno grupy roku, miesiąca i dnia, a następnie użyj ich nazw w stringu zamiany.
