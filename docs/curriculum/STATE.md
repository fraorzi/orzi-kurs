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

`feature/curriculum-typescript`

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
- JavaScript ukończony commitem `bc81b47` i wypchnięty na
  `origin/feature/curriculum-javascript`.
- TypeScript: zależność główna zaktualizowana do 6.0.3, a natywny kompilator 7.0.2
  dodany obok jako niezależna bramka zgodności CLI.
- TypeScript: usunięty zdeprecjonowany `baseUrl` z generowanego tsconfigu; mapowanie
  harnessu korzysta teraz z bezpośredniej ścieżki absolutnej.
- TypeScript po migracji: 37/37 rozwiązań i 37/37 starterów na TS 6 oraz TS 7.
- TypeScript: dodane `02b-advanced-narrowing` i `03b-structural-typing`, łącznie
  6 nowych zadań praktycznych.
- Nowy stan częściowy TypeScript: 43 zadania; nowe 6/6 rozwiązań i 6/6 starterów
  przechodzi na TS 6 oraz TS 7.
- TypeScript: dodane `04b-type-operators`, `06b-modern-generics` i `06c-tuples`,
  czyli kolejne 9 zadań opartych na rejestrach aplikacji, retry i typowanych komendach.
- Stan po ukończeniu zaawansowanych fundamentów: 52 zadania; nowych 15/15 rozwiązań
  i 15/15 starterów przechodzi na TS 6 oraz TS 7.
- Dodana automatyczna kontrola kompletności treści TypeScript: README, zastosowania,
  pułapki, starter, rozwiązanie, test i progresywne hinty.
- TypeScript: dodane `10b-recursive-types` z praktycznym deep freeze, ścieżkami
  konfiguracji i tail-recursive operacją na tuple.
- Stan częściowy: 55 zadań; nowych 18/18 rozwiązań i 18/18 starterów przechodzi
  na TS 6 oraz TS 7.
- Nowe tematy mają przypisane bezpośrednie materiały z oficjalnej dokumentacji
  TypeScript zamiast wyłącznie ogólnego fallbacku do Handbooka.
- Harness obsługuje ograniczony `tsconfig.task.json`, dzięki czemu zadania faktycznie
  włączają wybrane flagi ścisłości bez przejmowania konfiguracji modułów i emisji.
- TypeScript: dodane `13-modules-declarations`, `13b-module-augmentation` oraz
  `13c-strict-tsconfig`, łącznie 9 nowych zadań, w tym 6 wieloplikowych.
- Stan częściowy: 64 zadania; nowych 27/27 rozwiązań i 27/27 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodane `14-debug-types`, `14b-variance` i `14c-type-tests`.
- Testy typów są teraz także częścią artefaktu ucznia: osobne `type-tests.ts` są
  kompilowane, ale nie uruchamiane runtime.
- Stan częściowy: 73 zadania; nowych 36/36 rozwiązań i 36/36 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodane `16-async-types`, `17-runtime-boundaries` i `17b-dom-events`.
- Zadania obejmują zachowanie tuple przez `Awaited`, anulowanie i pule współbieżności,
  parsery danych `unknown`, branded ID, formularze oraz delegację zdarzeń DOM.
- Dodano jsdom jako środowisko deterministycznych testów DOM bez uruchamiania
  przeglądarki ani dev servera.
- Stan częściowy: 82 zadania; nowych 45/45 rozwiązań i 45/45 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodane `15-optimize-runtime` jako pierwszy blok `[O]` tego tracka.
- Startery są kompletne i poprawne funkcjonalnie; oblewają wyłącznie deterministyczne
  bramki jakości mierzące liczbę odczytów, wywołań selektora i zachowanie cache LRU.
- Stan częściowy: 85 zadań; nowych 48/48 rozwiązań i 48/48 starterów przechodzi
  na TS 6 oraz TS 7.

## Następne kroki

1. Dodać egzamin z type challenges oraz ścieżkę migracji TS 5.9 → 6 → 7.
2. Dodać elective: dekoratory i jawne zarządzanie zasobami.
3. Zbudować drugi moduł praktyczny po ukończeniu optymalizacji, testów typów
   i migracji.

## Otwarte ryzyka

- Aktualne środowisko ma Node 22, podczas gdy celem tracka będzie Node 24 LTS.
- TS 7 nie udostępnia jeszcze stabilnego API wymaganego przez `typescript-eslint`;
  do czasu wsparcia narzędzi repo musi utrzymywać TS 6 dla lintu i TS 7 dla
  dodatkowej bramki CLI.
- Lokalny JDK 11 nie wystarczy do przyszłej ścieżki JDK 25.
- Adaptery React, MySQL i Strapi wymagają zmian harnessu oraz nowych zależności.
- Pełna liczba przyszłych zadań jest duża; praca musi pozostać iteracyjna i
  checkpointowana w Git.
