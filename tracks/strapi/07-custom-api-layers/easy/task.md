# Easy - zdefiniuj jawną trasę custom

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Publikacja artykułu to akcja spoza standardowego CRUD - potrzebuje własnej
trasy z jawną `policy` i wyłączonym domyślnym public auth. Zaimplementuj
`solve()`, zwracający descriptor trasy:

- `method: "PUT"`, `path: "/articles/:documentId/publish"`;
- `handler: "article.publish"` - wskazuje metodę kontrolera, nie
  implementuje jej tutaj;
- `config.auth: true` - trasa nie jest dostępna dla roli `public` bez
  jawnego przyznania, w przeciwieństwie do domyślnego CRUD;
- `config.policies: ["api::article.can-publish"]` - dokładnie jedna
  policy, zgodna z konwencją nazewnictwa UID content type;
- każde wywołanie zwraca świeży obiekt - kolejne wywołania nie mogą
  współdzielić tej samej referencji do `config.policies`, żeby mutacja w
  jednym miejscu rejestracji tras nie wyciekła do innego.
