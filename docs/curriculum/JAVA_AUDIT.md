# Audyt tracka Java / PJATK

Data: 2026-07-17. Cel językowy: Java SE 25 (GA 2025-09-16).

## Zakres

Publiczny program studiów PJATK 2025/26 potwierdza kolejność przedmiotów: PPJ na
semestrze 1, GUI na 2 oraz UTP i SKJ na 3. TPO pozostaje rozszerzeniem. Odzyskany
plan zawierał 88 kompetencji, lecz żadnych implementacji ani testów.

| Grupa | Kompetencje wejściowe | Nowe duże zadania | Projekty końcowe |
|---|---:|---:|---:|
| PPJ | 20 | 9 | parser/model/raport CLI |
| GUI | 19 | 7 | Swing editor + JavaFX CRUD ViewModel |
| UTP | 23 | 11 | import transakcyjny + concurrent processor |
| SKJ | 19 | 8 | chat protocol + resilient HTTP client |
| TPO elective | 7 | 4 | idempotentny worker/outbox |
| Razem | 88 | 39 | 8 modułów |

Zadania są większe od pojedynczych ćwiczeń: każde łączy kilka blisko powiązanych
kompetencji i ma jeden kontrakt runtime. Dodatkowe zadanie UTP nie pochodzi z 88
punktów PJATK — pokrywa deltę JDK 25.

## Java 25 i zgodność

- Stabilny core w JDK 25 obejmuje m.in. module import declarations, compact source
  files, flexible constructor bodies oraz Scoped Values.
- Structured Concurrency jest w JDK 25 piątym preview, a primitive patterns trzecim;
  nie blokują ukończenia core i wymagają osobnej polityki `--enable-preview`.
- Lokalnie dostępny jest OpenJDK 24.0.1 oraz 11.0.27. Adapter używa 24 jako
  najbliższego środowiska zgodności dla zadań bez feature’ów 25-only.
- Pełna bramka docelowa powinna zostać powtórzona na JDK 25; nie instalowano runtime
  po odrzuceniu rozszerzonych narzędzi przez limit aplikacji.

## Harness i jakość

- `starter.java` i `_solution.java` są obsługiwane przez katalog, undo i verify.
- `runJavaTask` kompiluje izolowane `Solution.java` + `TestMain.java`, uruchamia
  asercje i ustawia `java.awt.headless=true`.
- `verify:java:compile` kompiluje rozwiązanie razem z testem bez uruchamiania kodu.
- Kontrakt treści wymaga grupy, zastosowań, pułapek, źródeł Java 25, startera,
  rozwiązania, testu i progresywnych hintów.
- Swing używa prawdziwych klas `java.desktop`; JavaFX jest ujęte przez FXML/CSS,
  controller/ViewModel/binding/TableView i projekty architektoniczne. Pełne UI
  JavaFX wymaga OpenJFX, którego nie ma w JDK.

## Źródła pierwotne

- [Program PJATK 2025/26](https://pja.edu.pl/wp-content/uploads/2026/01/Informatyka_stacjonarne_pierwszy_2025_rev2026-1.pdf)
- [Opisy przedmiotów PJATK](https://pja.edu.pl/wp-content/uploads/2023/02/Opis_przedmiotow_Ist.pdf)
- [PJATK GUI Dojo](https://dojo.pjwstk.edu.pl/pl/gui)
- [OpenJDK 25](https://openjdk.org/projects/jdk/25/)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 JLS](https://docs.oracle.com/javase/specs/jls/se25/html/)
- [JDK 25 release notes](https://www.oracle.com/java/technologies/javase/25-relnote-issues.html)

## Stan weryfikacji

- kompletność plików: 39/39 starterów, rozwiązań, zadań i testów,
- `javac --release 24` dla rozwiązania wraz z klasą testową: 39/39,
- runtime `TestMain` z asercjami i headless Swing: 39/39 rozwiązań,
- pierwotne startery: 39/39 poprawnie nie przechodzi całego pipeline’u,
- root TypeScript, lint i `git diff --check`: bez błędów przed dokumentacją.

Powtórzenie na fizycznym JDK 25 pozostaje testem zgodności środowiska, a nie luką
w działaniu bieżącej macierzy core 24/25.
