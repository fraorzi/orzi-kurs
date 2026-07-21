# Capstone — maintenance: naprawa incydentu webhooka

Drugi capstone ćwiczy najczęstszą realną pracę mida: nie greenfield, lecz
**wejście w cudzy kod z bug reportem** i bezpieczna naprawa z dokumentacją
decyzji. Handler webhooka Strapi przetwarza zdarzenia publikacji, ma trzy
usterki produkcyjne, a zadanie kończy się notatką postmortem z planem
rolloutu i rollbacku.

## Kontekst

Produkcja zgłasza: część publikacji „znika" (nie trafia do systemu docelowego),
baza jest przeciążona zapytaniami, a w logach pojawiają się sekrety webhooków.
Diagnoza wskazuje trzy niezależne błędy w jednym handlerze:
utrata retry (kolejność `seen`/`apply`), N+1 na dokumentach i log całego
zdarzenia. To skrzyżowanie wiedzy z Node (idempotencja, kolejność efektów),
MySQL/Strapi (batch zamiast N+1) i observability (redakcja logów).

## Decyzje

- **`seen` po sukcesie, nie przed.** Znacznik idempotencji musi odzwierciedlać
  *faktyczne* przetworzenie. Oznaczenie przed `apply` zamienia awarię
  w cichą utratę danych, bo retry widzi zdarzenie jako zrobione.
- **Batch po unikalnych id, remap na wejście.** Jedno `fetchMany` zamiast
  pętli; kolejność i duplikaty odtwarzamy z `documentIds`, nie z wyniku batcha.
- **Log z allow-listy.** Do logu trafiają `eventId` i liczba dokumentów —
  nigdy `secret`. Redakcja przez wybór pól, nie przez usuwanie.
- **Naprawa z artefaktem decyzyjnym.** Root cause, test regresji, metryka
  rolloutu i warunek rollbacku są częścią zadania — mid nie tylko naprawia,
  ale zostawia ślad, po którym zespół może wdrożyć i wycofać zmianę.

## Pułapki

- Oznaczenie `seen` przed efektem to najczęstszy bug idempotencji — wygląda
  poprawnie, dopóki nic nie zawiedzie.
- Batch, który gubi kolejność albo duplikaty, cicho zmienia dane wyjściowe.
- Redakcja logu przez blocklistę pól przecieka przy nowym polu; allow-lista nie.
- Postmortem bez warunku rollbacku to plan wdrożenia bez hamulca.

## Źródła (audyt 2026-07-20)

- [Google SRE: Postmortem culture](https://sre.google/sre-book/postmortem-culture/)
- [Strapi 5: Webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)
- [OWASP: Logging (ASVS)](https://owasp.org/www-project-application-security-verification-standard/)
