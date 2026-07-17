## Hint 1

Eksportowana zmienna może być zadeklarowana przez `export let environment = ...`.
Zmienia ją wyłącznie funkcja z tego samego modułu.

## Hint 2

W `api.js` importuj wiązanie:

```js
import { environment } from "./config.js";
```

Odczytuj je dopiero wewnątrz `apiUrl`, a nie podczas inicjalizacji modułu.

## Hint 3

Hosty wygodnie zapisać w obiekcie. Ścieżkę znormalizujesz przez
`path.startsWith("/") ? path : \`/${path}\``.
