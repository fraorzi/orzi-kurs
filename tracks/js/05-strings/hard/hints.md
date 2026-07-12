## Hint 1

`findAnagrams`: dwa słowa są anagramami, gdy po sprowadzeniu do małych liter
i **posortowaniu liter** są identyczne. Podpis słowa: `[...w].sort().join("")`.
Odrzuć najpierw kandydata identycznego z word (case-insensitive).
`slugify`: pipeline — lowercase → zamiana ł → NFD → wycięcie znaków łączących →
zamiana nie-alfanumerycznych na "-" → przycięcie myślników.

## Hint 2

```js
const signature = (w) => [...w.toLowerCase()].sort().join("");
```

`slugify` — środek pipeline'u:

```js
title
  .toLowerCase()
  .replaceAll("ł", "l")
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
```

## Hint 3

Końcówka `slugify` — zamiast zamieniać znaki specjalne na myślniki i potem
sprzątać brzegi, potnij string PO znakach specjalnych i sklej myślnikami:

```js
.split(/[^a-z0-9]+/)
.filter(Boolean)   // usuwa puste kawałki z brzegów i serii znaków
.join("-")
```

To załatwia myślniki wiodące, końcowe i podwójne za jednym zamachem
(a regexy z kotwicą i kwantyfikatorem typu `/-+$/` lint odrzuca jako
podatne na backtracking).
