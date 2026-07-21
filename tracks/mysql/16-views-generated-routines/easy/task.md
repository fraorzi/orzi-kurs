# Easy — udostępnij bezpieczny widok kontaktów

Dashboard supportu potrzebuje listy aktywnych klientów (`id`, `email`).
Zespół bezpieczeństwa wymaga, by nikt nie mógł przez ten raport dotrzeć,
nawet pośrednio, do `password_hash`. Widok utworzony przez `SELECT *`
z domyślnym `SQL SECURITY DEFINER` łamie to podwójnie: rozszerza kontrakt
o każdą przyszłą kolumnę tabeli, a do tego wykonuje się z uprawnieniami
twórcy widoku, nie osoby pytającej — konto z samym `SELECT` na widoku może
przez niego zobaczyć dane, do których wprost dostępu nie ma.

Napisz definicję, która:

- tworzy widok `active_customer_contacts` z kolumnami dokładnie `id, email`,
- pomija klientów z niepustym `deleted_at`,
- deklaruje `SQL SECURITY INVOKER` — widok wykonuje się z uprawnieniami
  wywołującego, nie definiującego,
- w efekcie: konto mające `SELECT` wyłącznie na widoku (bez `SELECT` na
  `customers`) nie może go odpytać. To zamierzone działanie INVOKER, nie
  usterka do naprawienia gdzie indziej.

Starter tworzy widok przez `SELECT *` z domyślnym DEFINER — naprawa samej
listy kolumn nie usuwa problemu eskalacji uprawnień.
