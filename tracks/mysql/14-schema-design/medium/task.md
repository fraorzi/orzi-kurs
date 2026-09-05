# Medium - wymodeluj relację wiele-do-wielu z domenowym stanem

Tryb: od zera. Napisz rozwiązanie w `starter.sql`, korzystając z opisanego schematu tabel.

Student zapisuje się na wiele kursów, kurs ma wielu studentów - klasyczna
relacja wiele-do-wielu. Ale para (student, kurs) to więcej niż samo
skojarzenie: ma własny stan (`active`/`completed`/`cancelled`) i datę
zapisu. Tabela łącząca `enrollments` musi jednocześnie: wymusić, że ta sama
para nie zapisze się dwa razy, ograniczyć stan do zamkniętego zbioru
wartości i zdecydować, co się dzieje z zapisami, gdy znika student albo
kurs - a te dwie decyzje wcale nie muszą być takie same.

## Wymagania

- `students(id)`, `courses(id)`, `enrollments(student_id, course_id,
  status, enrolled_at)`.
- Para `(student_id, course_id)` to naturalny klucz zapisu -
  `PRIMARY KEY (student_id, course_id)`, nie sztuczne `id AUTO_INCREMENT`.
- `status` ma `CHECK (status IN ('active', 'completed', 'cancelled'))` -
  baza odrzuca wartości spoza tego zbioru, nie tylko aplikacja.
- Usunięcie studenta kasuje kaskadowo jego zapisy (`ON DELETE CASCADE`) -
  to dane samego studenta, znikają razem z nim.
- Usunięcie kursu z zapisanymi studentami jest zablokowane (`ON DELETE
  RESTRICT`) - kurs z historią zapisów nie znika po cichu.

Dwie różne akcje `ON DELETE` na dwóch kluczach obcych tej samej tabeli to
świadomy wybór: cykl życia zapisu jest podporządkowany studentowi, ale kurs
jako encja ma istnieć niezależnie od tego, kto się na niego zapisał.
