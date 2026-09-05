# Dobierz funkcję odświeżania cache

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `planInvalidation` dla jawnej intencji:

- target `path` → `revalidatePath`; dynamiczny wzorzec z `[...]` wymaga `pathType`,
- tag + Action + `immediate` → `updateTag`,
- tag + Route Handler + `immediate` → `revalidateTag` z `{ expire: 0 }`,
- tag + `background` → `revalidateTag` z profilem `"max"`.

Zwróć opis komendy, nie wywołuj prawdziwego API Next.
