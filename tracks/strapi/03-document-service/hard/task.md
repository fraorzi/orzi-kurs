# Hard - zachowaj tożsamość dokumentu w repozytorium

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Repozytorium testowe trzyma wszystkie wersje wszystkich dokumentów w jednej
tablicy - tak jak baza trzyma osobny wiersz na `status` i `locale` tego
samego `documentId`. Zaimplementuj
`solve(entries, documentId, locale, status)`:

- zwróć wpis, którego `documentId`, `locale` i `status` **wszystkie**
  zgadzają się z argumentami - nigdy nie identyfikuj dokumentu przez
  numeryczne `id` ani `Number(documentId)`;
- gdy żaden wpis nie pasuje (zła kombinacja, nieistniejący dokument, brak
  żądanego locale albo statusu), zwróć `null`;
- gdy repozytorium ma wiele dokumentów i wiele wersji, wybierz dokładnie tę
  jedną kombinację - nie pierwszą z brzegu o pasującym `documentId`.
