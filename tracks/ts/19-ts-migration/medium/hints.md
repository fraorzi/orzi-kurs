## Hint 1

Buduj jedną tablicę `issues` i dopisuj do niej wyniki w kolejności z zadania. Nie
sortuj ich na końcu — kolejność jest częścią czytelnego planu migracji.

## Hint 2

Blockery TS 7 to opcje i składnia usunięte z kompilatora. Brak jawnego `types`,
`rootDir` lub `strict` oznacz jako `behavior-change`, bo projekt może nadal działać,
ale inaczej niż na TS 5.9.

## Hint 3

Rekomendacja resolution zależy od `facts.environment`: bundler dla aplikacji
budowanej przez Vite/Next/Bun, nodenext dla kodu uruchamianego bezpośrednio przez Node.
