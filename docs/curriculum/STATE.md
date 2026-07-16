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

`feature/curriculum-react`

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
- TypeScript: dodane `18-type-challenges` jako praktyczny egzamin z łączenia mapped,
  conditional, template literal i rekurencyjnych typów.
- Zamiast izolowanych łamigłówek zadania modelują handlery eventów, parametry tras
  oraz selekcję pól odpowiedzi API przez `DeepPick`.
- Stan częściowy: 88 zadań; nowych 51/51 rozwiązań i 51/51 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodane `19-ts-migration`, oparte na finalnych release notes TS 6 i 7.
- Zadania obejmują migrację `baseUrl`/`paths`, audyt twardych blockerów i zmian
  domyślnych oraz pipeline TS 6 API + TS 7 CLI bez `ignoreDeprecations`.
- Stan częściowy: 91 zadań; nowych 54/54 rozwiązań i 54/54 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodane elective `20-modern-features` ze standard decorators, `using`
  i przenośnym fallbackiem kontraktu `DisposableStack`.
- Harness ładuje `ESNext.Disposable`; testy nie zakładają jednak, że bieżący Node 22
  udostępnia globalny konstruktor, którego w tym środowisku faktycznie brakuje.
- Stan częściowy: 94 zadania; nowych 57/57 rozwiązań i 57/57 starterów przechodzi
  na TS 6 oraz TS 7.
- TypeScript: dodany końcowy `module-02`, wieloplikowy klient API zamówień łączący
  parsery danych `unknown`, branded `OrderId`, rozłączne błędy, retry z backoffem,
  timeout, zewnętrzny `AbortSignal` i generyczny limit współbieżności.
- Moduł działa z `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`,
  `useUnknownInCatchVariables` i `verbatimModuleSyntax`; testuje kontrakty runtime
  oraz compile-time.
- Końcowy stan tracka TypeScript: 33 pozycje i 95 zadań.
- Pełna macierz końcowa: 95/95 rozwiązań oraz 95/95 pierwotnych starterów na
  TypeScript 6.0.3 i TypeScript 7.0.2.
- Końcowe bramki repo: harness 42/42, root lint bez błędów i root `tsc --noEmit`
  bez diagnostyki.
- TypeScript ukończony commitem `b769e5c` i wypchnięty na
  `origin/feature/curriculum-typescript`.
- Utworzony i wypchnięty osobny branch `feature/curriculum-react`.
- React: zainstalowane przypięte Testing Library, DOM, user-event, jest-dom oraz
  bezpośrednia zależność `eslint-plugin-react-hooks`.
- Harness rozpoznaje `.tsx`/`.jsx`, typecheck obejmuje TSX z `react-jsx`, runner
  automatycznie wybiera jsdom dla tracka React, a lint obejmuje JSX/TSX.
- Dodany `@harness/react-test` z cleanupem, `renderWithUser` i licznikiem commitów
  opartym na `Profiler`.
- Ukryty smoke React: 2/2 rozwiązań i 2/2 starterów ma poprawne bramki; osobny
  przypadek potwierdza błąd `react-hooks/rules-of-hooks`.
- Harness po rozszerzeniu React: 47/47 testów.

## Następne kroki

1. Dodać kontrakt kompletności treści React.
2. Zbudować pierwszy blok 01–06: komponenty, JSX/identity, snapshot stanu,
   niemutowalne aktualizacje, dostępne formularze i stan pochodny.
3. Zweryfikować rozwiązania i pierwotne startery, zrobić checkpoint Git.

## Otwarte ryzyka

- Aktualne środowisko ma Node 22, podczas gdy celem tracka będzie Node 24 LTS.
- TS 7 nie udostępnia jeszcze stabilnego API wymaganego przez `typescript-eslint`;
  do czasu wsparcia narzędzi repo musi utrzymywać TS 6 dla lintu i TS 7 dla
  dodatkowej bramki CLI.
- Lokalny JDK 11 nie wystarczy do przyszłej ścieżki JDK 25.
- Adaptery React, MySQL i Strapi wymagają zmian harnessu oraz nowych zależności.
- Pełna liczba przyszłych zadań jest duża; praca musi pozostać iteracyjna i
  checkpointowana w Git.
