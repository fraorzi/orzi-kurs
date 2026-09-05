# Hard - połącz RBAC z własnością dokumentu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

RBAC (uprawnienia przypisane do ról) roli nie wie nic o właścicielu konkretnego rekordu - tę regułę
dopisuje warstwa domenowa. Zaimplementuj `solve(input)` dla
`{ role, userId?, action, ownerId, status }`:

- `role: "admin"` może każdą akcję na każdym dokumencie, niezależnie od
  właściciela i statusu;
- `role: "editor"` może `action: "update"` wyłącznie na dokumencie, którego
  jest właścicielem (`userId === ownerId`) - cudzy dokument, nawet po
  update, to odmowa; ta funkcja nie przyznaje editorowi `"find"` (o tym
  decyduje allow-list z zadania medium, nie ownership);
- `role: "public"` może wyłącznie `action: "find"` i wyłącznie, gdy
  `status === "published"` - draft nigdy nie jest widoczny publicznie,
  niezależnie od reszty pól.
