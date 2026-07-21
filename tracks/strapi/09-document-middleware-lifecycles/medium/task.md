# Medium — deduplikuj efekty lifecycle

W Strapi 5 jedno wywołanie Document Service (np. `publish`) potrafi
wyzwolić **wiele** zdarzeń lifecycle na poziomie bazy — osobno na locale,
osobno przy tworzeniu nowego draftu i kasowaniu starego published. Część
z tych zdarzeń to prawdziwe, niezależne zmiany (inny locale), a część to
czysty szum dla efektu, który powinien wystąpić raz na dokument.

Zaimplementuj `solve(events)`, które grupuje surowe zdarzenia hooków:

- klucz deduplikacji to trójka `documentId` + `action` + `locale` — zdarzenia
  różniące się locale albo action to **osobne, uprawnione** wpisy, nie szum;
- gdy kilka zdarzeń ma identyczny klucz, zostaw tylko **pierwsze** z nich
  (kolejność wejściowa ma znaczenie — to ono zwykle niesie ostateczny stan);
- zachowaj względną kolejność pozostałych, unikalnych zdarzeń;
- pusta lista wejściowa daje pustą listę wyjściową.
