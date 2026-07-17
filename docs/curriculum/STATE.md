# Stan długoterminowego zadania

Aktualizacja: 2026-07-16.

## Cel aktywny

Dokończyć repo do poziomu praktycznego mida, osobnymi branchami per język/framework,
z researchiem, deterministycznymi testami, review, commitami i pushami.

## Reguły stałe

- Wyłącznie GPT-5.6 Sol.
- Bez subagentów na modelu, którego nie można potwierdzić jako GPT-5.6 Sol.
- Bez dev servera, chyba że użytkownik poprosi.
- Bez modyfikowania postępu i rozwiązań ucznia podczas audytu.
- Użytkownik robi PR-y; agent robi branche, commity i push.

## Bieżący branch

`feature/curriculum-javascript`

## Ukończone w bieżącym etapie

- Inwentaryzacja repo, branchy, worktree, wersji i istniejących tracków.
- Wykrycie, że `feature/sidebar-exit-java-pjatk` bazuje na starym drzewie i nie może
  zostać scalony wprost.
- Baseline harnessu: 31/31.
- Baseline rozwiązań TypeScript: 37/37.
- Audyt aktualnych wersji i źródeł dla TS, React, Next, Node, MySQL, Strapi i Javy.
- Zapis modelu pracy, kompetencji mida i pierwszej roadmapy.
- Modernizacja `tasks/curriculum.md` według audytu wersji i brakujących kompetencji.
- Ujednolicenie katalogu TypeScript z planowanymi tematami migracji i TS 7.
- Fundament zaktualizowany commitem `38f9880` i wypchnięty na
  `origin/feature/curriculum-foundation`; poprzedni niezgodnie nazwany branch został
  usunięty lokalnie i z origin.
- JavaScript: 158/158 rozwiązań i 158/158 pierwotnych starterów na stanie wejściowym.
- Dodana automatyczna bramka starterów odzyskująca ich stan z historii Git.
- Rozpoczęty audyt core/elective oraz brakującego tematu modułów ESM.
- JavaScript po zmianach: 161/161 rozwiązań i 161/161 bramek starterów.

## Następne kroki

1. Dokończyć końcową kontrolę zmian JavaScriptu.
2. Commit i push brancha JavaScript.
3. Utworzyć `feature/curriculum-typescript`.

## Otwarte ryzyka

- Aktualne środowisko ma Node 22, podczas gdy celem tracka będzie Node 24 LTS.
- Repo ma TypeScript 5.9.3, podczas gdy aktualne stabilne wydanie to 7.0.
- Lokalny JDK 11 nie wystarczy do przyszłej ścieżki JDK 25.
- Adaptery React, MySQL i Strapi wymagają zmian harnessu oraz nowych zależności.
- Pełna liczba przyszłych zadań jest duża; praca musi pozostać iteracyjna i
  checkpointowana w Git.
