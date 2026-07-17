## Hint 1

Zbieraj powody do tablicy w ustalonej kolejności — każdy warunek to niezależny
`if` dopisujący jeden wpis.

## Hint 2

`enum` i `namespace` wykryjesz prostym regexem po słowie kluczowym i nazwie,
np. `/\benum\s+\w+/`. Alias ścieżki to import zaczynający się od `@/`.

## Hint 3

Ostatnia reguła łączy dwa warunki: w źródle jest import klamrowy
(`import { X } from`), a jednocześnie nigdzie nie występuje `import type`.
