# Wymodeluj relację wiele-do-wielu

Utwórz students, courses i enrollments. Para student/course jest naturalnym kluczem enrollmentu, a status ma CHECK.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
