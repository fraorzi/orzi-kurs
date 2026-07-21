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
- Kolejność nauki: JavaScript → TypeScript → React z TypeScriptem → Next.js z
  TypeScriptem; tracki React i Next nie dostają wariantów JS/JSX.

## Bieżący branch

`feature/curriculum-next`

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
- Infrastruktura React ukończona commitem `f70678e` i wypchnięta na
  `origin/feature/curriculum-react`.
- Dodany kontrakt kompletności treści React: teoria zastosowań, pułapki, źródła,
  starter, rozwiązanie, test przez wspólny helper i co najmniej dwa progresywne hinty.
- React 01–03: czyste komponenty i props, JSX/listy/identity oraz snapshot stanu,
  batching i aktualizacje funkcyjne.
- React 04–06: niemutowalne obiekty/tablice, kontrolowane i dostępne formularze
  z walidacją/focusem oraz stan pochodny i logika zdarzeń bez zbędnych efektów.
- Pierwszy blok React ma 6 tematów i 18 zadań. Każdy starter reprezentuje konkretny
  błąd, a testy obejmują m.in. zamrożone propsy, równoległe aktualizacje po `await`,
  dostępne opisy błędów, kolejność focusu i zmianę propsów bez synchronizacji efektem.
- Pełna macierz pierwszego bloku: 18/18 rozwiązań oraz 18/18 pierwotnych starterów.
- Harness po dodaniu kontraktu treści React: 49/49 testów.
- Pierwszy blok React ukończony commitem `9e39c62` i wypchnięty na
  `origin/feature/curriculum-react`.
- React 07: efekty jako niezależne procesy setup/cleanup, kompletne zależności,
  odpinanie subskrypcji i rozdzielanie systemów zewnętrznych.
- React 08: stabilne `useEffectEvent` z React 19.2, najnowsze wartości bez stale
  closure oraz testy liczące zbędne ponowne połączenia i subskrypcje.
- React 09: pending/success/error, deterministyczne race conditions, ignorowanie
  starych odpowiedzi, propagacja `AbortSignal` i ochrona przed adapterem kończącym
  pracę już po anulowaniu.
- React 10: lokalne uchwyty DOM przez `useRef`, hydratowalne relacje dostępności
  przez `useId` oraz cleanup callback refów dostępny od React 19.
- Stan częściowy React: 10 tematów i 30 zadań; 30/30 rozwiązań oraz 30/30
  pierwotnych starterów przechodzi właściwe bramki.
- Blok escape hatches ukończony commitem `88d6b35` i wypchnięty na
  `origin/feature/curriculum-react`.
- React 11: reducery od prostych akcji domenowych przez niemutowalną listę zadań
  po historię undo/redo z poprawnym czyszczeniem future.
- React 12: aktualna składnia providerów React 19, bezpieczne custom hooki bez
  fikcyjnych defaultów oraz osobne contexty stanu i dispatchu.
- `module-01`: wieloplikowa lokalna tablica zadań z reducerem, contextami,
  selektorami danych pochodnych, dostępnym formularzem, filtrami i testem
  niemutowalności zamrożonych danych wejściowych.
- React 13: rozłączne unie stanów UI, retry formularza bez utraty danych i checkout
  z reducerem pilnującym legalnych przejść.
- Stan częściowy React: 13 tematów, pierwszy moduł i 40 zadań; 40/40 rozwiązań oraz
  40/40 pierwotnych starterów przechodzi właściwe bramki.
- React 14: funkcyjne `form action`, walidacja i wynik przez `useActionState` oraz
  sekwencyjna kolejka Actions zależna od poprzedniego wyniku.
- React 15: `useFormStatus` w poprawnej granicy potomka formularza, odczyt
  wysyłanego `FormData` i niezależne statusy operacji.
- React 16: optimistic toggle z rollbackiem, atomowa aktualizacja powiązanych pól
  oraz reducer listy rebazowany na świeższych danych z zewnątrz.
- Stan częściowy React: 16 tematów, pierwszy moduł i 49 zadań; 49/49 rozwiązań oraz
  49/49 pierwotnych starterów przechodzi właściwe bramki.
- React 17: warunkowe czytanie contextu przez `use`, stabilna Promise pod Suspense
  oraz odrzucony zasób przechodzący do Error Boundary z retry i resetem.
- React 18: adapter external source, generyczny custom hook z cleanupem oraz store
  koszyka z cache'owanym snapshotem i `getServerSnapshot` dla SSR.
- Stan częściowy React: 18 tematów, pierwszy moduł i 55 zadań; 55/55 rozwiązań oraz
  55/55 pierwotnych starterów przechodzi właściwe bramki.
- React 19: debounce z cleanupem, trwały draft z lazy initializerem i domenowy
  custom hook z odroczonym `useDebugValue`.
- React 20: jedno źródło prawdy, sloty `children` i generyczny render prop
  zachowujący wybór przez stabilne ID po reorderze.
- React 21: fizyczna warstwa portalu, context i propagacja według drzewa React oraz
  izolowane, resetowalne Error Boundaries dla widgetów.
- `module-02`: wieloplikowy panel incydentów z listą pod Suspense, immutable external
  store, draftem w storage, Form Action, pending, optimistic mutation i toastem
  renderowanym przez portal.
- Cały track React używa TypeScript/TSX; audyt rozszerzeń nie znalazł zadań `.js`
  ani `.jsx`.
- Harness ma trwałą bramkę odrzucającą źródła JavaScript/JSX w trackach React i
  przyszłym Next.
- Stan częściowy React: 21 tematów, dwa moduły i 65 zadań; 65/65 rozwiązań oraz
  65/65 pierwotnych starterów przechodzi właściwe bramki.
- Końcowe bramki checkpointu: harness 51/51, root lint i root `tsc --noEmit`
  bez błędów.
- React 22: pilne i nieblokujące aktualizacje przez `useTransition`, stare wyniki
  pod Suspense przez `useDeferredValue` oraz zachowanie stanu przy sprzątaniu
  Effectów przez stabilne `<Activity>` z React 19.2.
- React 23: bezpośredni `ref` jako prop w React 19, ograniczone uchwyty przez
  `useImperativeHandle` i pomiar tooltipa przed repaintem przez `useLayoutEffect`.
- React 24: dodany prawdziwy harness React Compiler oparty na stabilnym
  `babel-plugin-react-compiler@1.0.0` i Babel Core; zadania sprawdzają Rules of
  Hooks, opt-in `"use memo"`, celowy brak kompilacji legacy oraz usunięcie
  wadliwego cache'u ukrytego przez `"use no memo"`.
- React 25: ręczne `useMemo`, `useCallback` i `memo` wyłącznie dla zmierzonego
  kosztu albo jawnego kontraktu referencji z zewnętrznym API.
- React 26: scenariusze debugowania wycieku subskrypcji, starego closure przez
  niepełne zależności i zbędnych commitów wynikających ze złego właściciela stanu.
- React 26b: startery optymalizacyjne są funkcjonalnie poprawne i oblewają tylko
  testy `[quality]`; rozwiązania stosują kompozycję `children`, lokalizację stanu,
  podział komponentów i memoizację dopiero po pomiarze.
- Stan częściowy React: 27 tematów, dwa moduły i 83 zadania; 83/83 rozwiązania oraz
  83/83 pierwotne startery przechodzą właściwe bramki.
- Końcowe bramki checkpointu wydajności: harness 51/51, root lint, root
  `tsc --noEmit`, `git diff --check` i kontrakt TypeScript-only bez błędów.
- React 27: trzy zadania uczą pisania testów komponentów jako kodu produkcyjnego:
  role i nazwy dostępne, `user-event`, kontrolowane Promise, zapytania `findBy` oraz
  parametryzowane przypadki bez snapshotów i selektorów DOM.
- React 28: live regions, ręcznie aktywowane taby z roving tabindex oraz modal z
  pułapką focusu, Escape i przywróceniem focusu do triggera.
- React 29: stabilne identity draftów po reorderze, matematyka fixed-size windowing
  i aktualne API `react-window@2.2.7` (`List`, nie historyczne `FixedSizeList`).
- React 30: rozdzielenie statycznych klas od wartości runtime, poprawne jednostki
  inline style oraz wąsko typowane CSS custom properties dla motywów i wykresów.
- React 31: elective server state na `@tanstack/react-query@5.101.2`: klucze cache'u,
  `staleTime`, request cancellation, invalidacja oraz optimistic cache update z
  rollbackiem zgodnym z aktualnymi callbackami Query 5.
- `module-03`: wieloplikowa konsola operacyjna łącząca dostępne taby, osobne cache'e
  filtrów, dynamiczne tokeny CSS, zarządzanie focusem w dialogu i optymistyczne
  przypisanie rekordu z rollbackiem.
- Końcowy stan tracka React: 32 tematy, trzy moduły i 99 zadań; cały kod ucznia i
  rozwiązań pozostaje w TypeScript/TSX, bez wariantów JavaScript/JSX.
- Pełna macierz końcowa: 99/99 wzorcowych rozwiązań oraz 99/99 pierwotnych
  starterów przechodzi właściwe bramki zachowania, typów i lintu.
- Końcowe bramki repo: harness 51/51, root lint, root `tsc --noEmit`,
  `git diff --check`, zgodność slugów katalogu i kontrakt TypeScript-only bez błędów.
- React ukończony commitem `513b85f`, kolejność dalszej nauki doprecyzowana w
  `dfa1196`; oba commity wypchnięte na `origin/feature/curriculum-react`.
- Utworzony i wypchnięty osobny branch `feature/curriculum-next` z ukończonego
  fundamentu React.
- Next: wykonany audyt dokładnie zainstalowanego `next@16.2.10`, lokalnych docs oraz
  oficjalnego Next Learn. Zapisano model App Router, async route props, opt-in Cache
  Components, semantykę `updateTag`/`revalidateTag`, `proxy.ts`, authz i testy.
- Dodana kolejność 20 tematów oraz dwóch modułów Next i odpowiadające grupy katalogu.
- Harness wybiera jsdom dla tracka Next, lint hooków obejmuje jego TSX, a wspólny
  `@harness/next-test` i kontrakt treści pilnują przyszłych zadań.
- Ukryty smoke Next przechodzi jako rozwiązanie 1/1 i starter 1/1; harness po
  rozszerzeniu ma 55/55 zielonych testów.
- Next 01: root layout, semantyczna struktura dokumentu, analizator ścieżek App
  Routera oraz wieloplikowy refactor z route group i prywatnym katalogiem.
- Next 02: wąskie Client Components, serializowalne DTO zamiast callbacków oraz
  ochrona modułu DAL przez `server-only@0.0.1` i brak importu serwera do client graph.
- Next 03: jawna walidacja odpowiedzi HTTP jako `unknown`, kontrolowane testy
  niezależnych promise'ów i częściowo zależny graf user → orders wykonywany bez
  zbędnego waterfallu.
- Pierwszy blok Next ma 3 tematy i 9 zadań, wyłącznie w TypeScript/TSX. Lokalne
  bramki tematów przechodzą 9/9 dla rozwiązań i 9/9 dla starterów.
- Next 04: stabilna konfiguracja `cacheComponents`, wąskie granice Suspense
  zachowujące static shell oraz audyt odróżniający async od runtime dynamic holes.
- Next 05: `use cache` na poziomie funkcji, request-time API wyprowadzone poza
  cached scope, jawny `cacheLife` i wielopoziomowe tagi z izolacją tenantów.
- Next 06: planowanie `updateTag`, `revalidateTag` i `revalidatePath`, Server Action
  z read-your-own-writes oraz uwierzytelniony webhook Route Handler z walidacją
  `unknown` i natychmiastowym `{ expire: 0 }`.
- Stan po bloku cache: 6 tematów i 18 zadań; 18/18 rozwiązań i 18/18 starterów
  przechodzi właściwe bramki TypeScript, zachowania i kontraktów źródła.
- Next 07–09: asynchroniczne params, bezpieczny catch-all, `generateStaticParams`,
  URL jako źródło prawdy filtrów i paginacji oraz dostępne loading/error/not-found.
- Expected errors są modelowane jako wyniki, a nieoczekiwane awarie obsługuje
  Client Error Boundary z aktualnym w Next 16.2 propem `unstable_retry`.
- Stan po bloku routingu: 9 tematów i 27 zadań; nowe 9/9 rozwiązań i 9/9 starterów
  przechodzi lokalne bramki.
- Next 10: walidacja `FormData` bez rzutowań, authn/authz przy zasobie przed mutacją
  oraz atomowy kontrakt idempotencji zamówienia z replay, konfliktem i recovery.
- Stan po Server Actions: 10 tematów i 30 zadań; temat przechodzi 3/3 dla rozwiązań
  i 3/3 dla starterów.
- Next 11: Route Handlers z walidacją query i cache policy, CORS/OPTIONS z allow-listą
  i limitem body oraz BFF z sekretem, timeoutem, mapowaniem błędów i DTO upstreamu.
- Next 12: dynamiczne metadata i noindex, bezpieczne remote images, lokalny font,
  skrypt zawężony do layoutu dashboardu i generowany OG 1200×630.
- Stan po warstwie HTTP i assets: 12 tematów i 36 zadań; nowe 6/6 rozwiązań i 6/6
  starterów przechodzi właściwe bramki.
- Next 13: minimalne i zweryfikowane payloady sesji, `server-only` DAL, authz przy
  zasobie zamykające IDOR oraz role-aware DTO bez wycieku sekretów.
- Next 14: statycznie analizowalny matcher, tani optimistic redirect zachowujący
  docelowy URL oraz stabilny rewrite eksperymentu z testami oficjalnych helperów
  Next 16.2; pełne authz celowo pozostaje w DAL i endpointach.
- Next 15: dostępny page-level skeleton z rezerwacją miejsca, niezależne granice
  Suspense oraz anulowalny eksport CSV przez `ReadableStream` bez buforowania
  całości i z decyzją 404 przed rozpoczęciem streamu.
- Next 16: wynik walidacji FormData jako stan, dostępne powiązanie komunikatów z
  polami, pending oraz wielooperacyjny formularz z intentem submittera i skrótem
  opartym na `requestSubmit()`.
- Next 17: dobór unit/integration/E2E, harness kontraktu Route Handlera przez Web
  Request/Response oraz krytyczny checkout E2E oparty na semantycznych locatorach.
- Stan po bloku bezpieczeństwa i UX: 17 tematów i 51 zadań; nowe 15/15 rozwiązań
  i 15/15 starterów przechodzi właściwe bramki.
- Next 18: fail-fast env bez ekspozycji sekretów, runtime-specific instrumentation,
  bezpieczne logi oraz audyt self-hostingu wielu instancji obejmujący build/action
  keys, deployment ID, shared cache, tagi, streaming i graceful drain.
- Next 19 `[D]`: realistyczne naprawy hydration mismatch, dyrektywy klienta w
  barrellu oraz uncached data awaitowanego przed zbyt późnym Suspense.
- Next 19b `[O]`: funkcjonalnie poprawne startery z osobnymi quality gates dla
  wagi client graph, startu równoległych odczytów i cardinality cache key.
- Next `module-01`: panel zgłoszeń z filtrem URL, scoped DAL/DTO, listą i szczegółem
  bez enumeracji zasobów oraz Action odporną na sfałszowany `projectId`.
- Next `module-02`: tenantowy Cache Component, mutacja stocku z dwoma tagami,
  niezależny streaming katalogu/alertów i telemetry z allow-listą danych.
- Końcowy stan tracka Next: 20 tematów, dwa moduły i 62 zadania wyłącznie w
  TypeScript/TSX. Pełna macierz: 62/62 rozwiązania i 62/62 pierwotne startery;
  harness 55/55, root lint, root `tsc --noEmit`, `git diff --check` oraz audyt
  rozszerzeń bez `.js/.jsx` są zielone.
- Utworzony osobny branch `feature/curriculum-node` z ukończonego tracka Next.
- Audyt Node 24.18 LTS objął oficjalne API runtime, native TypeScript, Permission
  Model, Fetch/Undici, Web Streams, AsyncLocalStorage, `node:test`, diagnostykę,
  stabilnego klienta WebSocket oraz status release candidate `node:sqlite`.
- `@types/node` przypięto do 24.13.3; zadania ucznia i rozwiązania tracka Node są
  wyłącznie w TypeScript.
- Dodana kolejność 20 tematów i dwóch modułów oraz kontrakt treści pilnujący sekcji
  zastosowań, pułapek, źródeł Node 24, startera, rozwiązania, testu i hintów.
- Node 01–06: moduły ESM/CJS, package exports, native TypeScript, process/env/argv,
  bezpieczne i atomowe pliki, bufory/UTF-8, zdarzenia, anulowanie, event loop,
  fair yielding i izolowany request context przez AsyncLocalStorage.
- Node 07–12: odporny klient fetch, retry i timeout, serwer HTTP bez frameworka,
  limity body, klasyczne streamy i backpressure, Web Streams/compression,
  child_process/worker protocol oraz testy z izolowanymi fixture'ami i portem 0.
- Node 13–18: CSPRNG, timing-safe comparison i scrypt, idempotentny graceful
  shutdown, structured logging, event-loop delay, diagnostics_channel, Permission
  Model, resource limits, bezpieczne CLI/NDJSON oraz osobne quality gates dla
  złożoności, bounded concurrency i leaków listenerów.
- Node 19–20 pozostają elective: prepared statements/transakcje/migracje SQLite
  oraz klient WebSocket z walidacją endpointu, jittered backoff i bounded queue.
- `module-01` to strumieniowy analizator NDJSON z limitami, tolerancją błędów,
  agregacją i AbortSignal. `module-02` to rdzeń usługi HTTP z routingiem,
  walidacją, idempotencją, request ID, bezpiecznymi błędami i testem integracyjnym.
- Końcowy stan tracka Node: 20 tematów, dwa moduły i 62 zadania. Pełna macierz
  rozwiązań i pierwotnych starterów przechodzi 62/62.
- Użytkownik jawnie wznowił pracę po checkpointcie Node; utworzono
  `feature/curriculum-mysql` z właściwej bazy `feature/curriculum-node`.
- Audyt MySQL rozszerzył plan do 22 tematów i dwóch modułów: dodano security/roles,
  Performance Schema, testy bazy, histogramy/invisible indexes oraz osobną warstwę
  danych mysql2, których brakowało w pierwszym planie.
- Harness rozpoznaje `starter.sql`/`_solution.sql`, nie wysyła SQL do ESLinta ani
  TypeScriptu i obsługuje reset/undo artefaktu SQL.
- Przypięto `mysql2@3.23.0`; helper tworzy osobną bazę utf8mb4 dla każdego testu,
  a następnie bezwarunkowo ją usuwa.
- Zainstalowano keg-only MySQL 8.4.10 i uruchomiono izolowaną instancję testową na
  localhost:33316. Smoke SQL przechodzi 1/1 dla rozwiązania i 1/1 dla startera.
- Kontrakt treści MySQL wymaga zastosowań, pułapek, źródeł 8.4, progresywnych
  hintów, startera, rozwiązania i lokalnego testu.
- Pierwsza partia MySQL obejmuje 24 zadania z wykonywalnym SQL: selekcję i NULL,
  typy/JSON/czas, JOIN-y, agregacje i tryby SQL, CTE oraz operacje zbiorów,
  funkcje okienkowe, DML i constraints. Testy sprawdzają nie tylko wynik, ale też
  mutacje, ograniczenia i zachowanie relacji na prawdziwym MySQL 8.4.
- Druga partia dodaje 21 zadań poziomu produkcyjnego: transakcje i savepointy,
  izolację i blokady, retry deadlocku, indeksy złożone/covering, EXPLAIN ANALYZE,
  histogramy, invisible indexes, keyset pagination, modelowanie oraz migracje z
  restore drillem. Testy otwierają równoległe sesje dla wyścigu rezerwacji,
  snapshotu i rzeczywistego deadlocku; komplet rozwiązań przechodzi 45/45.
- Ostatnia partia obejmuje views/generated columns/triggery, users/roles i least
  privilege, Performance Schema i lock waits, testy bazy, typowaną integrację
  mysql2, debug incydentów oraz trzy zadania z odrębną bramką `[quality]` planu.
- `module-01` łączy schemat marketplace, online migration ledger, constraints,
  konkurencyjny zakup ostatniej sztuki, keyset i EXPLAIN ANALYZE. `module-02`
  implementuje typowane repozytorium Node z prepared statements, transakcją,
  ograniczonym retry, lifecycle puli i bezpiecznymi metrykami.
- Końcowy stan tracka MySQL: 22 tematy, dwa moduły i 68 zadań wykonywanych na
  MySQL 8.4.10. Pełna macierz rozwiązań i starterów jest weryfikowana przez CLI.

## Następne kroki

1. Po MySQL przejść do Strapi 5 zgodnie z roadmapą.
2. Zachować niezależne zmiany UI użytkownika poza commitami curriculum.

## Otwarte ryzyka

- Bazowe środowisko ma Node 22; track utrzymuje tę zgodność, a kontrakt typów jest
  przypięty do `@types/node@24.13.3`. Semantykę wyłącznie dla Node 24 opisują źródła
  i zadania kontraktowe, a SQLite pozostaje elective.
- TS 7 nie udostępnia jeszcze stabilnego API wymaganego przez `typescript-eslint`;
  do czasu wsparcia narzędzi repo musi utrzymywać TS 6 dla lintu i TS 7 dla
  dodatkowej bramki CLI.
- Lokalny JDK 11 nie wystarczy do przyszłej ścieżki JDK 25.
- Adapter Strapi nadal wymaga zmian harnessu oraz nowych zależności.
- Pełna liczba przyszłych zadań jest duża; praca musi pozostać iteracyjna i
  checkpointowana w Git.

## Quality pass MySQL (2026-07-20)

- Przepisana warstwa dydaktyczna wszystkich 68 zadań (testy zachowania,
  README z modelem mentalnym, hinty per zadanie); moduły przebudowane na
  wieloplikowe; kontrakt treści wzmocniony. Rozwiązania bez zmian.
- Macierz: 68/68 rozwiązań i 68/68 starterów na MySQL 8.4.10, harness 67/67.
  Szczegóły: `MYSQL_AUDIT.md`. Setup bazy ucznia: `tracks/mysql/README.md`.
