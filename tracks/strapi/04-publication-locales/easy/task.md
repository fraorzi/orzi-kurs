# Easy - oddziel preview od odczytu publicznego

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Endpoint podglądu treści musi zwrócić `status` dla Document Service:
`draft`, gdy żądający ma prawo widzieć niepublikowane zmiany, w
przeciwnym razie zawsze `published`. Zaimplementuj `solve(preview, role)`:

- `draft` tylko wtedy, gdy **jednocześnie** `preview` jest `true` **i**
  `role === "editor"` - sama flaga `preview` nic nie daje bez odpowiedniej
  roli;
- każda inna kombinacja (brak roli, inna rola, `preview` na `false`
  niezależnie od roli) zwraca `published`;
- brak drugiego argumentu (`role === undefined`) traktuj jak brak
  uprawnień, nie jak wyjątek od reguły.
