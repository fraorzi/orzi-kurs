# Zweryfikuj minimalny payload sesji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `readSession`. Najpierw wywołaj przekazany `verify(token)`. Wynik
traktuj jako `unknown` i zaakceptuj tylko obiekt z niepustym `userId`, rolą
`member | admin` oraz całkowitym `expiresAt` większym niż `nowSeconds`.

Dla błędu podpisu, złego payloadu lub wygaśnięcia zwróć `null`. Wynik ma zawierać
wyłącznie trzy dozwolone pola.
