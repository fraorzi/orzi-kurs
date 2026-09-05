# [D] Medium - usuń podwójne powiadomienie z lifecycle

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Zgłoszenie: po jednej publikacji artykułu subskrybenci webhooka dostają
2-4 identyczne powiadomienia. Diagnoza: lifecycle hooki Strapi 5 odpalają
się **per rekord**, a jeden logiczny `publish` dotyka wielu rekordów
(warianty locale, komponenty). Bez deduplikacji każdy rekord = osobne
powiadomienie.

Popraw `solve(hooks)`:

- każdy hook ma `documentId` i `operationId` (identyfikator jednej logicznej
  operacji publikacji);
- zwróć `documentId` **jeden raz na operationId** - dwa hooki o tym samym
  `operationId` i `documentId` to ta sama publikacja rozbita na rekordy;
- różne `operationId` na tym samym dokumencie to osobne publikacje -
  zachowaj obie;
- kolejność wyniku zgodna z kolejnością pierwszego wystąpienia.
