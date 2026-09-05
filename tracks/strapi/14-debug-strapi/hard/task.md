# [D] Hard - zamknij wyciek draftów i pól prywatnych

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Zgłoszenie bezpieczeństwa: publiczne REST API zwraca wersje robocze
artykułów i pole `secret` z konfiguracji. Diagnoza: handler oddaje surowe
dokumenty z Document Service bez filtra statusu i bez sanitizacji pól.

Popraw `solve(docs, role)`:

- dla `role === "public"` zwróć **wyłącznie** dokumenty `published` -
  drafty nie mogą wyciec;
- dla `role === "editor"` przepuść też drafty (podgląd redakcyjny);
- w obu przypadkach każdy dokument ograniczasz do allow-listy pól
  `documentId`, `status`, `title`, `slug` - `secret` i inne pola spoza listy
  nigdy nie trafiają do odpowiedzi;
- kolejność dokumentów zachowana.
