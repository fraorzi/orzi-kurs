# Easy — builder zachowujący literały

Zaimplementuj:

- `defineRoutes` — przyjmuje mapę ścieżek zaczynających się od `/`, zwraca
  zamrożoną kopię i zachowuje literalne klucze oraz wartości bez `as const`
  u wywołującego,
- `tuple` — tworzy readonly tuple zachowującą typ każdego argumentu.

Użyj `const` type parameters. Nie poszerzaj wyniku do constraintu.
