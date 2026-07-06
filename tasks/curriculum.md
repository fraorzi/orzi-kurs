# Kurykulum — pełny zakres do poziomu mid

Kontrakt treści: każda przyszła sesja tworząca zadania realizuje kolejne pozycje z tej
listy wg konwencji ze SPEC.md, wzorując się na `tracks/js/01-05`. Każde zagadnienie =
README (teoria + „kiedy używać / kiedy unikać / pułapki") + easy/medium/hard.
`[D]` = zagadnienie debugowe (naprawa zepsutego/nieoptymalnego kodu).
`module-NN` = wieloplikowy mini-projekt łączący poprzednie ~10 zagadnień.

Zasada objętości: liczy się pokrycie materiału, nie liczba pozycji — jeśli temat jest
szeroki (np. useEffect), dostaje kilka zagadnień. Lista może rosnąć, nie maleć.

## js (~21 pozycji ≈ 63 zadania) — 01–05 gotowe

- [x] 01 domknięcia
- [x] 02 metody tablic
- [x] 03 promisy
- [x] 04 async/await
- [x] 05 event loop
- [ ] 06 `this`, call/apply/bind, metody obiektów
- [ ] 07 prototypy i klasy (dziedziczenie, statyki, pola prywatne)
- [ ] 08 obsługa błędów (throw, custom errors, finally, error cause)
- [ ] 09 destructuring, spread/rest, parametry domyślne
- [ ] 10 Map/Set/WeakMap (i kiedy obiekt nie wystarcza)
- [ ] module-01 (mini-projekt: np. in-memory store z eventami)
- [ ] 11 [D] debug: subtelne błędy logiczne (mutacje, off-by-one, stale closure)
- [ ] 12 iteratory i generatory (protokoły, lazy sequences)
- [ ] 13 immutability w praktyce (structuredClone, freeze, wzorce update)
- [ ] 14 własny EventEmitter (on/off/once/emit)
- [ ] 15 debounce i throttle (implementacje + różnice)
- [ ] 16 rekurencja (drzewa, spłaszczanie, limity stosu)
- [ ] 17 fetch, AbortController, obsługa JSON i błędów HTTP
- [ ] 18 [D] debug: wydajność i pamięć (łapane benchmarkiem, leaki przez domknięcia)
- [ ] module-02 (mini-projekt: klient API z retry/timeout/kolejką)

## ts (~16 pozycji ≈ 48 zadań)

- [ ] 01 typy podstawowe, inference, literal types, as const
- [ ] 02 unie, narrowing, type guards, discriminated unions
- [ ] 03 obiekty: interface vs type, optional, readonly, index signatures
- [ ] 04 funkcje: sygnatury, overloads, void/unknown/never
- [ ] 05 generyki: podstawy (funkcje, interfejsy)
- [ ] 06 generyki: constraints, defaults, wiele parametrów
- [ ] 07 utility types (Partial, Pick, Omit, Record, ReturnType, Awaited)
- [ ] 08 mapped types (własne utility)
- [ ] 09 conditional types + infer
- [ ] 10 template literal types
- [ ] module-01 (typowanie realnego modułu JS end-to-end)
- [ ] 11 klasy: abstract, implements, modyfikatory
- [ ] 12 enums vs const objects, satisfies
- [ ] 13 moduły, declaration files (.d.ts), typowanie bibliotek
- [ ] 14 [D] debug: naprawa błędów typów w realnym kodzie (any-zatrucie, złe generyki)
- [ ] 15 mix z type-challenges (medium) jako egzamin
- [ ] module-02 (typowany klient API — łączy z js/module-02)

## react (~24 pozycje ≈ 72 zadania) — hooki rozbite na warianty

- [ ] 01 komponenty i props (czysto renderujące, kompozycja)
- [ ] 02 JSX: warunki, listy, keys (i czemu index bywa zły)
- [ ] 03 useState: podstawy, batching, updater function
- [ ] 04 useState: obiekty i tablice (immutable updates)
- [ ] 05 formularze kontrolowane (inputy, selecty, walidacja)
- [ ] 06 useEffect: cykl życia, zależności, cleanup
- [ ] 07 useEffect: pobieranie danych, race conditions, AbortController
- [ ] 08 [D] stale closures w hookach (najczęstszy bug Reacta)
- [ ] 09 useRef: DOM i mutable box (kiedy ref, kiedy state)
- [ ] 10 useMemo/useCallback: stabilność referencji, kiedy NIE używać
- [ ] 11 re-rendery: React.memo, licznik renderów (testowane Profilerem!)
- [ ] module-01 (interaktywny widget wieloplikowy, bez fetchy)
- [ ] 12 useReducer (kiedy zamiast useState)
- [ ] 13 useContext: kompozycja providerów, wydajność kontekstu
- [ ] 14 custom hooks (useDebounce, useLocalStorage, useFetch)
- [ ] 15 podnoszenie stanu, kompozycja przez children, render props
- [ ] 16 error boundaries i portale
- [ ] 17 useSyncExternalStore (stores zewnętrzne)
- [ ] 18 useTransition/useDeferredValue (współbieżny React)
- [ ] 19 [D] debug: nadmiarowe re-rendery i zepsute zależności (Profiler + lint)
- [ ] 20 wzorce testowania komponentów (Testing Library idiomatycznie)
- [ ] 21 wydajność list (klucze, memo, koncepcja windowing)
- [ ] 22 style w JS/React (obiekt style, CSS variables z JS — wyjątek od Tailwinda)
- [ ] module-02 (feature wieloplikowy: lista + filtry + fetch + cache)

## next (~12 pozycji ≈ 36 zadań)

- [ ] 01 App Router: struktura, layouts, strony
- [ ] 02 server vs client components (granica, "use client")
- [ ] 03 pobieranie danych na serwerze + cache/revalidate
- [ ] 04 dynamic routes, params, generateStaticParams
- [ ] 05 loading/error/not-found (granice UI)
- [ ] 06 server actions (formularze bez API)
- [ ] 07 route handlers (API)
- [ ] 08 metadata i SEO
- [ ] 09 middleware (auth-gate, redirecty)
- [ ] 10 streaming i Suspense
- [ ] 11 [D] debug: hydration errors, złe granice client/server
- [ ] module-01 (mała apka: lista + szczegół + mutacja przez action)

## node (~11 pozycji ≈ 33 zadania)

- [ ] 01 moduły CJS vs ESM, process, argv, env
- [ ] 02 fs i path (sync/async, strumieniowo)
- [ ] 03 streams (pipe, transform, backpressure)
- [ ] 04 events (EventEmitter node'owy)
- [ ] 05 http server bez frameworka (routing ręczny)
- [ ] 06 buffers i kodowania
- [ ] 07 child_process i worker_threads (kiedy co)
- [ ] 08 timery node'owe, setImmediate vs nextTick (event loop node)
- [ ] 09 [D] debug: blokowanie event loopa, leaki
- [ ] 10 budowa CLI (argumenty, exit codes, stdin/stdout)
- [ ] module-01 (CLI tool wieloplikowy, np. analizator logów)

## strapi (~8 pozycji ≈ 24 zadania)

- [ ] 01 struktura projektu, admin, content types
- [ ] 02 relacje między typami, komponenty, dynamic zones
- [ ] 03 REST API: populate, filters, sort, pagination
- [ ] 04 auth: JWT, role, permissions
- [ ] 05 custom controllers i services
- [ ] 06 lifecycle hooks i walidacja
- [ ] 07 [D] debug: N+1 populate, dziurawe permissions
- [ ] module-01 (backend do realnego frontu — łączy z next/module-01)

## mysql (~13 pozycji ≈ 39 zadań)

- [ ] 01 SELECT, WHERE, ORDER BY, LIMIT
- [ ] 02 JOINy (inner/left/self) — na porządnym schemacie
- [ ] 03 GROUP BY, agregacje, HAVING
- [ ] 04 podzapytania i CTE
- [ ] 05 INSERT/UPDATE/DELETE, transakcje
- [ ] 06 constraints, klucze, ON DELETE
- [ ] 07 indeksy + EXPLAIN (zadania wydajnościowe!)
- [ ] 08 funkcje okienkowe (ROW_NUMBER, RANK, LAG)
- [ ] 09 widoki i procedury (podstawy)
- [ ] 10 projektowanie schematu, normalizacja
- [ ] 11 [D] debug: slow query, N+1, brakujący indeks
- [ ] 12 mysql2 z Node (parametryzacja, pooling, SQL injection)
- [ ] module-01 (schemat + zapytania pod realną aplikację)

## combined (~8 dużych zadań)

- [ ] ts-react-01: typowanie komponentów i custom hooków (generyczne propsy)
- [ ] ts-react-02: typowany reducer + context
- [ ] js-node-01: narzędzie CLI używające wzorców z js (pool, retry)
- [ ] react-next-01: migracja widgetu klienckiego na server components
- [ ] next-strapi-01: pełny CRUD feature (front + backend + auth)
- [ ] next-strapi-02: upload plików + Image
- [ ] node-mysql-01: warstwa danych z transakcjami
- [ ] full-01: kapston — feature przez wszystkie warstwy

**Suma: ~105 zagadnień ≈ 340–360 zadań + 10 testów modułowych.**
