# Easy - dopuść do zapisu tylko redaktora

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Endpoint publikacji artykułu współdzielą trzy role: `public`, `editor`,
`admin`. Zanim żądanie dotrze do kontrolera, policy musi zdecydować, czy
w ogóle ma sens je wykonywać - w Strapi 5 policy to
`(policyContext, config, { strapi }) => boolean`, gdzie rolę czyta się
z `policyContext.state.user.role`.

Zaimplementuj `solve(user)`:

- `user` może być `undefined` (żądanie bez tożsamości) albo obiektem
  z opcjonalnym `role`;
- zwróć `true` wyłącznie dla `role` równego `"editor"` lub `"admin"`;
- każda inna wartość `role` (w tym `"public"`, literówka, `undefined`,
  pusty string) oraz brak `user` musi dać `false`;
- policy tylko **decyduje** - nie wykonuje żadnego zapisu ani efektu
  ubocznego, więc funkcja ma być czysta i synchroniczna.
