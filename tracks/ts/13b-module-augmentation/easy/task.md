# Easy - scalanie metadanych requestu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zadeklaruj `RequestMeta` w dwóch osobnych deklaracjach `interface`:

- część bazowa: `requestId: string`, `startedAt: number`,
- część auth: `userId?: number`, `roles?: readonly string[]`.

Zaimplementuj `requestLabel(meta)`: bez użytkownika zwraca sam requestId, a z userId
zwraca `"<requestId>:user=<id>"`.

Nie zastępuj interfejsu aliasem ani jedną deklaracją - celem jest declaration merging.
