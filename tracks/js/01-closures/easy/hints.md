## Hint 1

Obie funkcje mają **zwrócić inną funkcję**. Zmienna zadeklarowana w funkcji zewnętrznej
(np. `let count = 0`) jest widoczna dla funkcji wewnętrznej i przeżywa między jej
wywołaniami — to jest właśnie domknięcie.

## Hint 2

`makeCounter`: zadeklaruj `let count = 0`, zwróć funkcję robiącą `return count++`
(zwraca starą wartość, potem zwiększa). `sum`: `return (b) => a + b` — parametr `a`
też jest częścią domknięcia.
