# Kurykulum — pełny zakres do poziomu mid

Kontrakt treści: każda przyszła sesja tworząca zadania realizuje kolejne pozycje z tej
listy wg konwencji ze SPEC.md, wzorując się na `tracks/js/01-05`. Każde zagadnienie =
README (teoria + „kiedy używać / kiedy unikać / pułapki") + easy/medium/hard.
`[D]` = zagadnienie debugowe: starter to kompletny **zepsuty** kod, uczeń go naprawia
(starter oblewa testy poprawności).
`[O]` = zagadnienie optymalizacyjne: starter to kompletny kod, który **działa poprawnie**,
ale jest nieoptymalny — uczeń go przepisuje bez zmiany kontraktu (starter przechodzi testy
poprawności, oblewa tylko bramkę wydajności: `expectScaling` albo licznik pracy).
Szczegóły i bramki obu typów: SPEC.md → „Typy zagadnień".
`module-NN` = wieloplikowy mini-projekt łączący poprzednie ~10 zagadnień.

Zasada: każdy track ma dostać zarówno `[D]`, jak i `[O]` — samo debugowanie nie uczy
optymalizacji działającego kodu, a to codzienna robota (profilowanie, dobór struktury
danych, unikanie powtórzonej pracy).

Zasada objętości: liczy się pokrycie materiału, nie liczba pozycji — jeśli temat jest
szeroki (np. useEffect), dostaje kilka zagadnień. Lista może rosnąć, nie maleć.

Zasada progresji: KAŻDY track zaczyna od bloku podstaw do aktywnego pisania —
czytać kod ≠ pisać z głowy, więc nawet „znane" konstrukcje (składnia funkcji, pętle,
typy) mają swoje zadania. Trudność rośnie z pozycją na roadmapie; wewnątrz zagadnienia
easy → medium → hard. Numery w nazwach istniejących katalogów są stabilnymi
identyfikatorami treści i nie wyznaczają już kolejności nauki.

## js (rdzeń mida gotowy + elective)
(baseline przed audytem: verify:solutions js = 158/158 i verify:starters js = 158/158;
po audycie dodano 09b-modules, więc track ma 161 zadań. Wszystkie wcześniejsze pozycje audytowe b/c gotowe:
05b, 05c, 10b, 16b, 17b, 17c, 18b, 20b, 21b, 22b, 25b, 27b, 29b, 31b.
KOMPLET: module-01..05 gotowe. Tematy w etapie Elective nie blokują przejścia do TS.)

### Kolejność nauki na roadmapie

Źródłem kolejności dla aplikacji jest `curriculum/order.ts`, a nie alfabetyczne
sortowanie katalogów. Etapy są ułożone według prerekwizytów:

1. Fundamenty: funkcje → scope → typy → liczby → pętle → stringi, Unicode i regex.
2. Dane i granice kodu: obiekty → destructuring → tablice → moduły ESM →
   immutability → Map/Set → JSON i Date → closures → rekursja.
3. Model obiektowy: `this` → prototypy → klasy → obsługa błędów → debug logiki.
4. Async i integracje: promises → async/await → event loop → błędy async → fetch
   → debounce/throttle → EventEmitter → module-01.
5. Architektura języka: iteratory → generatory → deskryptory → WeakMap → module-04.
6. Jakość: debug wydajności → optymalizacje → module-02, module-03 i module-05.
7. Elective po osiągnięciu mida: Intl.Segmenter, BigInt, Promise.withResolvers,
   iterator helpers, async generators, Proxy/Reflect, WeakRef, trampoliny i regex advanced.

- [x] 01 funkcje: deklaracja vs wyrażenie vs arrow (this/arguments/hoisting),
      parametry domyślne i rest, funkcje jako wartości
- [x] 02 zmienne i zakresy: let/const/var, hoisting, TDZ, shadowing, bloki
- [x] 03 typy i konwersje: === vs ==, truthy/falsy, NaN, konwersje jawne/niejawne
- [x] 04 pętle i iteracja: for, for..of, for..in, while, break/continue
- [x] 05 stringi: template literals, najważniejsze metody, split/join
- [x] 05b Unicode w stringach: jednostki UTF-16 vs code points, [...str] vs split(""),
      normalize w praktyce, Intl.Segmenter dla grafemów (emoji ze ZWJ)
      (audyt: MDN — pułapki length/emoji z README 05 zasługują na własne zadania)
- [x] 05c Intl.Segmenter — segmentacja słów i zdań (granularity "word"/"sentence"),
      liczenie słów świadome lokalizacji, iteracja po zdaniach, pole isWordLike
      (audyt: MDN Intl.Segmenter — wymiar słów/zdań odrębny od grafemów z 05b)
- [x] 06 obiekty podstawy: literały, dynamiczne klucze, Object.keys/values/entries,
      kopiowanie płytkie, opcjonalne łańcuchowanie ?. i ??
- [x] 07 destructuring, spread/rest w obiektach i tablicach
- [x] 08 domknięcia
- [x] 09 metody tablic
- [x] 09b moduły ESM: named/default exports, importy jako żywe wiązania, jawny
      publiczny kontrakt przez re-eksport oraz bezpieczny dynamic import z allow-listą
      (audyt 2026-07-16: brakowało podstawowej granicy kodu wymaganej w realnych projektach)
- [x] 10 promisy
- [x] 10b Promise.withResolvers (ES2024) i wzorzec deferred: most callback→promise,
      ręczne rozstrzyganie z zewnątrz, kolejki zadań
      (audyt: MDN — dostępne w Node 22, upraszcza wzorce z 10/12-hard)
- [x] 11 async/await
- [x] 12 event loop
- [x] module-01 (mini-projekt: in-memory store z eventami, wieloplikowy) — pierwszy [O]dblokowany moduł
- [x] 13 `this`, call/apply/bind, metody obiektów
- [x] 14 prototypy: łańcuch prototypów, Object.create, F.prototype, natywne prototypy
      (rozbite z „prototypy i klasy" — audyt: javascript.info ma osobną sekcję)
- [x] 15 klasy: składnia, dziedziczenie, statyki, pola prywatne, rozszerzanie wbudowanych
      (rozbite z „prototypy i klasy" — audyt)
- [x] 16 obsługa błędów (throw, custom errors, finally, error cause)
- [x] 16b błędy asynchroniczne: try/catch wokół await, throw w obietnicach,
      Promise.allSettled przy częściowych błędach, unhandledrejection
      (audyt: osobny wymiar od 16 — sync try/catch nie łapie async; MDN + javascript.info)
- [x] 17 Map i Set (i kiedy obiekt nie wystarcza)
      (rozbite z „Map/Set/WeakMap" — audyt: osobne rozdziały javascript.info)
- [x] 17b operacje na zbiorach: union/intersection/difference/isSubsetOf
      (natywne Set methods ES2025 w Node 22 vs ręczne implementacje)
      (audyt: MDN Set methods — realny wariant implementacyjny + wydajnościowy)
- [x] 17c grupowanie i indeksowanie: Object.groupBy / Map.groupBy (ES2024),
      Map jako indeks/cache zamiast wielokrotnego .find()
      (audyt: MDN Object.groupBy — nowość w Node 22, praktyczny wzorzec mid)
- [x] 18 WeakMap/WeakSet: cache per obiekt, dane prywatne, pamięć
      (rozbite z „Map/Set/WeakMap" — audyt)
- [x] 18b WeakRef i FinalizationRegistry (zaawansowane zarządzanie pamięcią,
      kiedy NIE używać) (audyt: MDN — dopełnienie tematu słabych referencji)
- [x] 19 [D] debug: subtelne błędy logiczne (mutacje, off-by-one, stale closure)
- [x] 20 iteratory i iterables (protokół iteratora, Symbol.iterator, lazy bez generatorów)
      (rozbite z „iteratory i generatory" — audyt)
- [x] 20b iterator helpers (ES2025, Node 22+): .map/.filter/.take/.drop/.toArray
      na iteratorach — leniwe pipeline'y bez generatorów i bez tablic pośrednich
      (audyt: MDN Iterator helpers — naturalny wariant implementacyjny do 20/21,
      też wymiar wydajnościowy [O]: lazy vs materializacja)
- [x] 21 generatory (yield*, delegacja, leniwe sekwencje, next(arg))
      (rozbite z „iteratory i generatory" — audyt)
- [x] 21b async generatory i for await...of (strumienie async, paginacja)
      (audyt: javascript.info „Async iteration and generators" — osobny wymiar od sync)
- [x] 22 deskryptory właściwości, gettery/settery (defineProperty, wzorzec observe)
      (dopisane — audyt: javascript.info „Object properties configuration")
- [x] 22b Proxy i Reflect (przechwytywanie operacji, walidacja, reaktywność)
      (audyt: javascript.info „Proxy and Reflect" — meta-programowanie, dopełnienie 22)
- [x] 23 immutability w praktyce (structuredClone, freeze, wzorce update)
- [x] 24 własny EventEmitter (on/off/once/emit, semantyka Node)
- [x] 25 debounce i throttle (implementacje + różnice)
- [x] 25b warianty debounce/throttle: leading/trailing, cancel/flush, throttle na rAF
      (audyt: lodash docs — realne opcje produkcyjne, osobny poziom trudności)
- [x] 26 [D] debug: asynchroniczność (brakujący await, forEach+async, sekwencyjne await)
      (dopisane — audyt: kanon błędów async)
- [x] 27 rekurencja (drzewa, spłaszczanie, limity stosu)
- [x] 27b trampolina i iteracyjne alternatywy rekurencji (unikanie przepełnienia stosu)
      (audyt: kanon — dopełnienie „limity stosu" z 27)
- [x] 28 JSON i serializacja (replacer/reviver, toJSON, cykle)
      (dopisane — audyt: javascript.info „JSON methods")
- [x] 29 liczby i precyzja (IEEE-754, EPSILON, zaokrąglanie, losowość)
      (dopisane — audyt: javascript.info „Numbers")
- [x] 29b BigInt: literały n, arytmetyka, zakaz mieszania z number (TypeError),
      konwersje, kiedy używać (id, kwoty, > MAX_SAFE_INTEGER), czego brakuje (Math.*)
      (audyt: MDN BigInt — jedyny typ liczbowy nieobecny w tracku; domyka też
      uproszczenie looseEq z 03-hard)
- [x] 30 Date i czas (tworzenie, arytmetyka dat, formatowanie względne)
      (dopisane — audyt: javascript.info „Date and time")
- [x] 31 wyrażenia regularne: podstawy praktyczne (grupy, flagi, replace z funkcją)
      (dopisane — audyt: javascript.info RegExp + MDN)
- [x] 31b regex zaawansowany: lookbehind (?<=)/(?<!), flaga y (sticky, tokenizacja),
      flaga v (unicode sets, ES2024), $<name> w replace, escapowanie danych do wzorca
      (audyt: MDN — dopełnienie 31; censor z 31-medium zakłada brak metaznaków,
      tu wariant z escapowaniem)
- [x] 32 fetch, AbortController, obsługa JSON i błędów HTTP
- [x] 33 [D] debug: wydajność i pamięć (łapane benchmarkiem, leaki przez domknięcia)
      (uwaga: easy/hard tego zagadnienia są de facto w duchu [O] — kod poprawny, ale wolny;
      medium to prawdziwy bug (wyciek). Kolejne zadania optymalizacyjne robimy jako [O])
- [x] 34 [O] optymalizacja: dobór struktury danych — indeks Map/Set zamiast skanowania,
      `has` w O(1) zamiast `includes`, kiedy tablica jest lepsza od Map
- [x] 35 [O] optymalizacja: unikanie powtórzonej pracy — memoizacja, wyciąganie obliczeń
      i regexów poza pętlę, jedno przejście zamiast kilku `filter().map().reduce()`
- [x] 36 [O] optymalizacja: alokacje i kopie — spread w pętli (O(n²)) vs push,
      budowanie stringów, mutacja lokalnego bufora i niemutowalny wynik na końcu
- [x] 37 [O] optymalizacja async: sekwencyjnie vs `Promise.all`, batching żądań,
      limit współbieżności (pool) — mierzone licznikiem maxActive, nie czasem
- [x] module-02 (mini-projekt: klient API z retry/timeout/kolejką, wieloplikowy)
- [x] module-03 (feature: paginowany klient listy — fetch + cache Map + AbortController
      przy zmianie zapytania + debounce wyszukiwania; skleja 17/25/32/35) (audyt)
- [x] module-04 (feature: mini state manager — pub/sub + niemutowalne aktualizacje
      + undo/redo na historii stanów; skleja 22/23/24) (audyt)
- [x] module-05 (feature: rate limiter + kolejka zadań — throttle, pool współbieżności,
      batching, backoff przy retry; skleja 25/10/37/32) (audyt)

## ts (33 pozycje, 95 zadań) — rdzeń mida gotowy

Stan końcowy audytu: 95/95 rozwiązań i 95/95 pierwotnych starterów przechodzi
odpowiednie bramki na TypeScript 6.0.3 oraz natywnym TypeScript 7.0.2. Główny
toolchain pozostaje na TS 6 do czasu wsparcia API TS 7 przez zależności lintu;
TS 7 działa równolegle jako obowiązkowa bramka CLI.

- [x] 01 typy podstawowe, inference, literal types, `as const`
- [x] 02 unie, narrowing, type guards, discriminated unions
- [x] 02b narrowing zaawansowany: predykaty `x is T`, `asserts x is T`, inferred type
      predicates (TS 5.5) i wyczerpanie unii przez `never` (audyt)
- [x] 03 obiekty: interface vs type, optional, readonly, index signatures
- [x] 03b typowanie strukturalne: excess property checks, weak types i zgodność kształtów
      (audyt — Handbook „Object Types", Effective TS)
- [x] 04 funkcje: sygnatury, overloads, void/unknown/never, parametr `this`
- [x] 04b operatory typów: `keyof`, `typeof`, indexed access i bezpieczne klucze obiektów
- [x] 05 generyki: podstawy (funkcje, interfejsy)
- [x] 06 generyki: constraints, defaults, wiele parametrów
- [x] 06b generyki nowoczesne: `const` type parameters (TS 5.0), `NoInfer` (TS 5.4),
      zachowanie sygnatur funkcji wyższego rzędu (audyt)
- [x] 06c krotki i wariadyczne tuple types: labeled tuples, `[...T]`, typowanie
      `curry`/`pipe` (audyt — Handbook „Variadic Tuple Types")
- [x] 07 utility types (Partial, Pick, Omit, Record, ReturnType, Parameters, Awaited)
- [x] 08 mapped types: własne utility, key remapping `as`, modyfikatory `+/-readonly`, `?`
- [x] 09 conditional types + `infer`, distributive conditional types i wyłączanie dystrybucji
- [x] 10 template literal types
- [x] 10b typy rekurencyjne: DeepPartial/DeepReadonly, ścieżki obiektu, tail-recursive
      operacje na krotkach; limity rekurencji TS (audyt — type-challenges medium/hard)
- [x] module-01 (typowanie realnego modułu JS end-to-end)
- [x] 11 klasy: abstract, implements, modyfikatory, parameter properties,
      `#private` vs `private`
- [x] 12 enums vs const objects, `satisfies` vs `as` vs adnotacja
- [x] 13 moduły, declaration files `.d.ts`, typowanie bibliotek, `import type`,
      `verbatimModuleSyntax`
- [x] 13b declaration merging i module augmentation (rozszerzanie cudzych typów) (audyt)
- [x] 13c tsconfig i tryby ścisłości: strictNullChecks, noUncheckedIndexedAccess,
      exactOptionalPropertyTypes, moduleResolution (audyt)
- [x] 14 [D] debug: `any`-zatrucie, błędne generyki, niebezpieczne assertions
- [x] 14b [D] wariancja: covariance/contravariance, bivariance metod i dziurawe tablice (audyt)
- [x] 14c testowanie typów: `@ts-expect-error`, assertion helpers i testy kontraktów
- [x] 15 [O] optymalizacja kodu runtime bez utraty kontraktów typów: poprawny, ale wolny
      moduł TS — przepisz bez zmiany typów; bramka `expectScaling` (audyt: track musi
      mieć [O], nie tylko [D])
- [x] 16 typowanie async: Promise/Awaited, generyczny fetch, modelowanie sukcesu i błędu
      (audyt — łączy z js/10-11)
- [x] 17 granice runtime: `unknown`, parsery, branded types, parse-don't-validate
      (audyt — Total TypeScript patterns)
- [x] 17b DOM i zdarzenia: EventTarget, HTMLElement, dataset, formularze i bezpieczne narrowing
- [x] 18 mix z type-challenges (medium) jako egzamin
- [x] 19 migracja TS 5.9 → 6.0 → 7.0: nowe domyślne opcje, usunięte/deprecated
      konfiguracje, import attributes, zgodność narzędzi i diagnoza zmian inferencji
- [x] 20 elective: dekoratory oraz `using`/DisposableStack — kiedy projekt realnie ich wymaga
- [x] module-02 (typowany klient API: parsery `unknown`, branded ID, jawne `Result`,
      retry/backoff, timeout, zewnętrzny AbortSignal, generyczna kolejka i type tests;
      łączy 13c/14c/16/17 z praktyką js/module-02)
- Przyszłe (wymaga rozszerzenia harnessu): [O] wydajność typów mierzona liczbą
  instancjacji (`tsc --extendedDiagnostics`) — naiwna rekurencja vs tail-recursive.

## react (~35 pozycji ≈ 105 zadań) — React 19.2, efekty jako escape hatch

Audyt 2026-07-16: kolejność odpowiada oficjalnym blokom Describing UI →
Interactivity → Managing State → Escape Hatches → async UI React 19 → jakość.
Stabilne `<Activity>` pozostaje w core; Canary `<ViewTransition>` i API
eksperymentalne są poza rdzeniem. Testy zachowania, dostępność i stany błędów są
integrowane od pierwszych bloków, nie odkładane wyłącznie na pozycje 27–28.

- [ ] 01 komponenty, props, kompozycja i czystość renderowania
- [ ] 02 JSX, warunki, listy, keys, identity oraz reset stanu przez `key`
- [ ] 03 state jako snapshot: useState, batching i updater function
- [ ] 04 useState: obiekty i tablice (immutable updates)
- [ ] 05 formularze kontrolowane, walidacja, dostępne etykiety, focus i komunikaty błędów
- [ ] 06 derived state, logika zdarzeń i „You Might Not Need an Effect”
- [ ] 07 useEffect tylko do synchronizacji z systemem zewnętrznym: dependencies, cleanup
- [ ] 08 useEffectEvent, stale closures i oddzielanie zdarzeń od efektów
- [ ] 09 ręczny fetch w efekcie: race conditions, AbortController i dlaczego to
      mechanizm niskopoziomowy, nie domyślna architektura danych
- [ ] 10 useRef, callback refs i useId
- [ ] 11 useReducer (kiedy zamiast useState)
- [ ] 12 useContext: kompozycja providerów, React 19 provider syntax, wydajność
- [ ] module-01 (interaktywny widget wieloplikowy, bez fetchy)
- [ ] 13 modelowanie UI jako stanów: idle/pending/success/error/empty zamiast zestawu
      niezależnych booleanów; przejścia i nieosiągalne kombinacje
- [ ] 14 formularze i Actions: form `action`, useActionState
- [ ] 15 useFormStatus i projektowanie stanów pending/error/success
- [ ] 16 useOptimistic i bezpieczne optimistic updates
- [ ] 17 `use`, Suspense i Error Boundary dla danych oraz contextu
- [ ] 18 useSyncExternalStore (stores zewnętrzne)
- [ ] 19 custom hooks: projektowanie API, useDebounce/useLocalStorage, useDebugValue
- [ ] 20 podnoszenie stanu, kompozycja przez children, render props
- [ ] 21 portale i granice błędów poza przepływem danych z Suspense
- [ ] 22 useTransition, useDeferredValue i `<Activity>`
- [ ] 23 ref jako prop, useImperativeHandle i useLayoutEffect do pomiarów layoutu
- [ ] 24 React Compiler: automatyczna memoizacja, reguły Reacta, stopniowa adopcja
      i diagnozowanie pominiętych optymalizacji
- [ ] 25 useMemo/useCallback/React.memo tylko po pomiarze lub dla kontraktu referencji
- [ ] 26 [D] nadmiarowe re-rendery, zepsute zależności i brak cleanup (Profiler + lint)
- [ ] 26b [O] optymalizacja wolnego widoku: lokalizacja stanu, podział komponentów,
      memoizacja tam, gdzie pomiar wykazał koszt
- [ ] 27 wzorce testowania komponentów: role, nazwa dostępna, user-event, async UI,
      unikanie testów szczegółów implementacji
- [ ] 28 dostępność komponentów: klawiatura, focus management, live regions, dialog
      i testy regresji dostępności
- [ ] 29 wydajność list (klucze, memo, koncepcja windowing)
- [ ] 30 style w JS/React (obiekt style, CSS variables z JS — wyjątek od Tailwinda)
- [ ] 31 elective: server state z TanStack Query — query keys, staleTime, invalidation,
      mutations, cancellation i optimistic updates bez własnego `useEffect`
- [ ] module-02 (feature: formularz Action + lista Suspense + optimistic mutation)
- [ ] module-03 (feature: lista z serwerowym cache, filtrami i zewnętrznym store)

## node (~18 pozycji ≈ 54 zadania) — Node 24 LTS

- [ ] 01 ESM vs CJS, `package.json` type, package exports/imports i granice pakietu
- [ ] 02 process: argv, env, cwd, exitCode, błędy konfiguracji i sekrety
- [ ] 03 fs i path: async, FileHandle, atomowy zapis i bezpieczne ścieżki
- [ ] 04 streams: Readable/Writable/Transform, pipeline i backpressure
- [ ] 05 events: EventEmitter, once, error, listener cleanup i AbortSignal
- [ ] 06 HTTP server bez frameworka: routing, body limit, statusy i poprawne zamykanie odpowiedzi
- [ ] 07 buffers, TypedArray, kodowania tekstu i granice binarne
- [ ] 08 child_process vs worker_threads vs zwykły async — I/O i praca CPU
- [ ] 09 event loop Node: fazy, setImmediate, nextTick i starvation
- [ ] 10 `node:test`: unit/integration, fixtures, mockowanie granic i coverage
- [ ] 11 anulowanie, timeouty i propagacja AbortSignal przez warstwy
- [ ] 12 sygnały procesu, graceful shutdown, zamykanie serwera i aktywnych zasobów
- [ ] 13 diagnostyka: memoryUsage, CPU profile, heap snapshot, diagnostics_channel
      i podstawy obserwowalności
- [ ] 14 bezpieczeństwo runtime: nieufne wejście, path traversal, command injection,
      limity zasobów i bezpieczne logowanie
- [ ] 15 [D] debug: blokowanie event loopa, leak listenerów/streamów i porzucone Promise
- [ ] 15b [O] optymalizacja: cały plik w pamięci → stream; synchroniczne fs w pętli
      → kontrolowana współbieżność (kod działa, ale nie skaluje się)
- [ ] 16 budowa CLI: stdin/stdout/stderr, exit codes, sygnały, format JSON i UX błędów
- [ ] module-01 (produkcyjny analizator logów: stream, transform, worker opcjonalny,
      anulowanie, testy i graceful shutdown)

## next (~20 pozycji ≈ 60 zadań) — Next 16.2, App Router i Cache Components

- [ ] 01 App Router: struktura, layouts, pages, route groups i colocation
- [ ] 02 Server vs Client Components: serializowalne propsy, granica bundle i `"use client"`
- [ ] 03 pobieranie danych na serwerze: async komponenty, równoległość i eliminacja waterfalls
- [ ] 04 Cache Components: `cacheComponents`, static shell, dynamic holes i Suspense
- [ ] 05 `use cache`, cacheLife, cacheTag oraz wymagania serializacji klucza
- [ ] 06 rewalidacja: updateTag, revalidateTag, revalidatePath i read-your-own-writes
- [ ] 07 dynamic routes, asynchroniczne params/searchParams i generateStaticParams
- [ ] 08 nawigacja: Link, prefetch, useRouter, search params, filtry i paginacja w URL
- [ ] 09 loading/error/not-found, expected errors i granice UI
- [ ] 10 Server Actions: formularze, walidacja, authz, błędy i idempotencja
- [ ] 11 Route Handlers i Backend for Frontend: metody, cookies, cache, CORS i limity
- [ ] 12 metadata, Open Graph, Image, Font, Script i optymalizacja zasobów
- [ ] 13 authn vs authz, DAL, sesje i bezpieczne sprawdzanie uprawnień blisko danych
- [ ] 14 `proxy.ts` (nie middleware): redirect, rewrite, headers i ograniczenia auth-gate
- [ ] 15 streaming, Suspense, `use` i sensowne granice skeletonów
- [ ] 16 dostępność i walidacja formularzy, focus po błędzie i pending states
- [ ] 17 testowanie: funkcje serwerowe, Route Handlers, komponenty i krytyczne e2e
- [ ] 18 instrumentacja, logowanie, environment variables, deployment i self-hosting
- [ ] 19 [D] debug: hydration, niepoprawna granica server/client, uncached data poza Suspense
- [ ] 19b [O] optymalizacja: zbyt szeroki client bundle, waterfall i źle dobrany cache
- [ ] module-01 (lista + szczegół + filtry URL + mutacja Action + authz)
- [ ] module-02 (feature z Cache Components, tagami, streamingiem, testami i instrumentacją)

## mysql (~20 pozycji ≈ 60 zadań) — MySQL 8.4 LTS

- [ ] 01 SELECT, WHERE, ORDER BY, LIMIT i poprawna obsługa NULL
- [ ] 02 typy danych, DECIMAL, daty/strefy, tekst/collation i JSON
- [ ] 03 JOINy (inner/left/self) — na porządnym schemacie
- [ ] 04 GROUP BY, agregacje, HAVING i ONLY_FULL_GROUP_BY
- [ ] 05 podzapytania, CTE i set operations
- [ ] 06 funkcje okienkowe: ROW_NUMBER, RANK, LAG i ramy okna
- [ ] 07 INSERT/UPDATE/DELETE, upsert i bezpieczne zmiany zbiorcze
- [ ] 08 constraints, klucze, ON DELETE/UPDATE i niezmienniki domeny
- [ ] 09 transakcje, ACID, autocommit, savepoint i obsługa błędu
- [ ] 10 izolacja, MVCC, blokady, phantom reads i deadlock retry
- [ ] 11 indeksy B-tree, selektywność, indeksy złożone i leftmost prefix
- [ ] 12 EXPLAIN/EXPLAIN ANALYZE, estymacje vs wykonanie i koszt zapisu indeksu
- [ ] 13 paginacja offset vs keyset, stabilny porządek i indeks wspierający
- [ ] 14 projektowanie schematu, normalizacja, denormalizacja i audyt decyzji
- [ ] 15 migracje schematu, kompatybilna zmiana i podstawy backup/restore
- [ ] 16 widoki, procedury i triggery — zastosowania oraz koszt ukrytej logiki
- [ ] 17 [D] debug: zły JOIN, NULL, utracona aktualizacja, deadlock i brakujący indeks
- [ ] 17b [O] optymalizacja: poprawny wynik, lecz zły plan — przepisanie zapytania
      lub indeks; bramka `EXPLAIN ANALYZE`
- [ ] 18 mysql2 z Node: parametryzacja, pooling, transakcje i SQL injection
- [ ] module-01 (schemat + migracje + raporty + transakcja + plan zapytania)

## strapi (~15 pozycji ≈ 45 zadań) — Strapi 5

- [ ] 01 struktura projektu, admin, content types i wygenerowane typy TypeScript
- [ ] 02 relacje, komponenty, dynamic zones i modelowanie treści
- [ ] 03 Document Service: `documentId`, find/create/update/delete i status dokumentu
- [ ] 04 Draft & Publish, locale/i18n i różnica dokument vs wpis bazodanowy
- [ ] 05 REST API v5: płaska odpowiedź, fields, populate, filters, sort i pagination
- [ ] 06 authn, JWT/API tokens, role i permissions jako allow-list
- [ ] 07 custom routes, controllers i services z cienkim kontrolerem
- [ ] 08 policies i middleware HTTP: walidacja kontekstu, authz i współdzielona logika
- [ ] 09 Document Service middleware; lifecycle hooks tylko ze świadomością wielu
      operacji DB dla publish/unpublish/locales
- [ ] 10 walidacja domenowa, błędy API i transakcje w custom service
- [ ] 11 upload/media: limity, typy plików, uprawnienia i bezpieczne powiązanie
- [ ] 12 webhooks i rewalidacja cache Next po zmianie treści
- [ ] 13 testy API przez HTTP, fixture danych, izolacja bazy i test permissions
- [ ] 14 [D] debug: `id` vs `documentId`, podwójne lifecycle, N+1 populate,
      dziurawe permissions i wyciek draftu
- [ ] 14b [O] optymalizacja: ograniczenie fields/populate, batching i cache/revalidation
- [ ] module-01 (backend contentowy v5 do realnego frontu — authz, draft, media,
      webhook, testy; łączy z next/module-02)

## combined (~13 dużych zadań)

- [ ] ts-react-01: typowanie komponentów i custom hooków (generyczne propsy)
- [ ] ts-react-02: typowany reducer + context
- [ ] js-node-01: narzędzie CLI używające wzorców z js (pool, retry)
- [ ] react-next-01: migracja widgetu klienckiego na server components
- [ ] next-strapi-01: pełny CRUD feature (front + backend + auth)
- [ ] next-strapi-02: upload plików + Image
- [ ] node-mysql-01: warstwa danych z transakcjami
- [ ] quality-01: zastany feature — dodać test regresji, poprawić dostępność,
      usunąć problem wydajnościowy i opisać decyzję
- [ ] security-01: authn/authz, walidacja, rate limit, sekrety i bezpieczne logi
- [ ] delivery-01: CI, migracje, konfiguracja środowisk, kontener, healthcheck i rollback
- [ ] observability-01: correlation id, structured logs, metryki i diagnoza incydentu
- [ ] full-01: capstone — pionowy feature przez wszystkie warstwy
- [ ] full-02: capstone maintenance — wejście w obcy kod, bug report, fix, test,
      optymalizacja i plan bezpiecznego wdrożenia

**Suma (minimum, nie limit): ~170 zagadnień ≈ 520–580 zadań + moduły przekrojowe.**
Sesje treści i audyty (tasks/prompts.md) mają obowiązek dopisywać pozycje, gdy źródła
pokazują więcej wariantów.
