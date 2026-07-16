## Hint 1

Najpierw zamień wszystkie `\\` na `/`, a potem podziel ścieżkę na segmenty.

## Hint 2

Znajdź segment `app`; wszystko przed nim jest nieistotne dla URL.

## Hint 3

Route group spełnia wzorzec `^\(.+\)$`, slot zaczyna się od `@`, a prywatny folder
od literalnego `_`.

## Hint 4

Po usunięciu segmentów organizacyjnych pusta lista oznacza trasę `/`.
