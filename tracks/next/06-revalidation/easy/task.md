# Dobierz prymityw rewalidacji

Zaimplementuj `planInvalidation` dla jawnej intencji:

- target `path` → `revalidatePath`; dynamiczny wzorzec z `[...]` wymaga `pathType`,
- tag + Action + `immediate` → `updateTag`,
- tag + Route Handler + `immediate` → `revalidateTag` z `{ expire: 0 }`,
- tag + `background` → `revalidateTag` z profilem `"max"`.

Zwróć opis komendy, nie wywołuj prawdziwego API Next.
