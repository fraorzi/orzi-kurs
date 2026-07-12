## Hint 1

Najpierw w `src/math.js` zwróć sumę: `nums.reduce((acc, n) => acc + n, 0)`.
Potem w `src/index.js` podziel sumę przez `nums.length`, ale najpierw obsłuż
pustą tablicę (zwróć `0`, żeby nie dzielić przez zero).
