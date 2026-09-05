# Easy - publiczny widok profilu i weak patch

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `toProfilePreview`, która przyjmuje dowolny obiekt zgodny z
`ProfilePreview` i zwraca **nowy** obiekt zawierający tylko `id` i `name`.

Zaimplementuj też niemutujące `applyProfilePatch`. Patch może zmienić tylko `name`
i `email`; oba pola są opcjonalne. Pusty patch jest poprawny.

Zwróć uwagę na różnicę między literałem z nadmiarowym polem, zmienną o szerszym
kształcie i weak type bez żadnego wspólnego pola.
