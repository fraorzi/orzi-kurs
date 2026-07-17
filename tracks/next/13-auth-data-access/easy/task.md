# Zweryfikuj minimalny payload sesji

Zaimplementuj `readSession`. Najpierw wywołaj przekazany `verify(token)`. Wynik
traktuj jako `unknown` i zaakceptuj tylko obiekt z niepustym `userId`, rolą
`member | admin` oraz całkowitym `expiresAt` większym niż `nowSeconds`.

Dla błędu podpisu, złego payloadu lub wygaśnięcia zwróć `null`. Wynik ma zawierać
wyłącznie trzy dozwolone pola.
