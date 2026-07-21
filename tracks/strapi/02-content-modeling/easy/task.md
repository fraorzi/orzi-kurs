# Easy — zweryfikuj kardynalność relacji

Panel administracyjny pozwala zapisać konfigurację relacji, zanim schemat
jest w pełni spójny — walidacja musi to złapać przed zapisem do bazy.
Zaimplementuj `solve(relation)`:

- odrzuć (`false`) każdą wartość `relation` spoza zbioru `oneToOne`,
  `oneToMany`, `manyToOne`, `manyToMany`;
- dla relacji jednokierunkowej (`bidirectional: false`) `mappedBy` i
  `inversedBy` są opcjonalne — zwróć `true`, gdy typ jest wspierany;
- dla relacji dwukierunkowej (`bidirectional: true`) wymagaj dokładnie
  jednego wskazania właściciela: `mappedBy` lub `inversedBy` — brak obu
  oznacza, że Strapi nie wie, która strona trzyma klucz obcy.
