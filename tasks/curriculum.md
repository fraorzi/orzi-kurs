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
typy) mają swoje zadania. Trudność rośnie z numerami zagadnień; wewnątrz zagadnienia
easy → medium → hard.

## js (01–37 gotowe: numerowane + pierwsze [O] optymalizacyjne)
(verify:solutions js = 111/111; zostają module-01/02 + pozycje z audytu)

- [x] 01 funkcje: deklaracja vs wyrażenie vs arrow (this/arguments/hoisting),
      parametry domyślne i rest, funkcje jako wartości
- [x] 02 zmienne i zakresy: let/const/var, hoisting, TDZ, shadowing, bloki
- [x] 03 typy i konwersje: === vs ==, truthy/falsy, NaN, konwersje jawne/niejawne
- [x] 04 pętle i iteracja: for, for..of, for..in, while, break/continue
- [x] 05 stringi: template literals, najważniejsze metody, split/join
- [ ] 05b Unicode w stringach: jednostki UTF-16 vs code points, [...str] vs split(""),
      normalize w praktyce, Intl.Segmenter dla grafemów (emoji ze ZWJ)
      (audyt: MDN — pułapki length/emoji z README 05 zasługują na własne zadania)
- [x] 06 obiekty podstawy: literały, dynamiczne klucze, Object.keys/values/entries,
      kopiowanie płytkie, opcjonalne łańcuchowanie ?. i ??
- [x] 07 destructuring, spread/rest w obiektach i tablicach
- [x] 08 domknięcia
- [x] 09 metody tablic
- [x] 10 promisy
- [ ] 10b Promise.withResolvers (ES2024) i wzorzec deferred: most callback→promise,
      ręczne rozstrzyganie z zewnątrz, kolejki zadań
      (audyt: MDN — dostępne w Node 22, upraszcza wzorce z 10/12-hard)
- [x] 11 async/await
- [x] 12 event loop
- [ ] module-01 (mini-projekt: in-memory store z eventami, wieloplikowy)
- [x] 13 `this`, call/apply/bind, metody obiektów
- [x] 14 prototypy: łańcuch prototypów, Object.create, F.prototype, natywne prototypy
      (rozbite z „prototypy i klasy" — audyt: javascript.info ma osobną sekcję)
- [x] 15 klasy: składnia, dziedziczenie, statyki, pola prywatne, rozszerzanie wbudowanych
      (rozbite z „prototypy i klasy" — audyt)
- [x] 16 obsługa błędów (throw, custom errors, finally, error cause)
- [ ] 16b błędy asynchroniczne: try/catch wokół await, throw w obietnicach,
      Promise.allSettled przy częściowych błędach, unhandledrejection
      (audyt: osobny wymiar od 16 — sync try/catch nie łapie async; MDN + javascript.info)
- [x] 17 Map i Set (i kiedy obiekt nie wystarcza)
      (rozbite z „Map/Set/WeakMap" — audyt: osobne rozdziały javascript.info)
- [ ] 17b operacje na zbiorach: union/intersection/difference/isSubsetOf
      (natywne Set methods ES2025 w Node 22 vs ręczne implementacje)
      (audyt: MDN Set methods — realny wariant implementacyjny + wydajnościowy)
- [ ] 17c grupowanie i indeksowanie: Object.groupBy / Map.groupBy (ES2024),
      Map jako indeks/cache zamiast wielokrotnego .find()
      (audyt: MDN Object.groupBy — nowość w Node 22, praktyczny wzorzec mid)
- [x] 18 WeakMap/WeakSet: cache per obiekt, dane prywatne, pamięć
      (rozbite z „Map/Set/WeakMap" — audyt)
- [ ] 18b WeakRef i FinalizationRegistry (zaawansowane zarządzanie pamięcią,
      kiedy NIE używać) (audyt: MDN — dopełnienie tematu słabych referencji)
- [x] 19 [D] debug: subtelne błędy logiczne (mutacje, off-by-one, stale closure)
- [x] 20 iteratory i iterables (protokół iteratora, Symbol.iterator, lazy bez generatorów)
      (rozbite z „iteratory i generatory" — audyt)
- [ ] 20b iterator helpers (ES2025, Node 22+): .map/.filter/.take/.drop/.toArray
      na iteratorach — leniwe pipeline'y bez generatorów i bez tablic pośrednich
      (audyt: MDN Iterator helpers — naturalny wariant implementacyjny do 20/21,
      też wymiar wydajnościowy [O]: lazy vs materializacja)
- [x] 21 generatory (yield*, delegacja, leniwe sekwencje, next(arg))
      (rozbite z „iteratory i generatory" — audyt)
- [ ] 21b async generatory i for await...of (strumienie async, paginacja)
      (audyt: javascript.info „Async iteration and generators" — osobny wymiar od sync)
- [x] 22 deskryptory właściwości, gettery/settery (defineProperty, wzorzec observe)
      (dopisane — audyt: javascript.info „Object properties configuration")
- [ ] 22b Proxy i Reflect (przechwytywanie operacji, walidacja, reaktywność)
      (audyt: javascript.info „Proxy and Reflect" — meta-programowanie, dopełnienie 22)
- [x] 23 immutability w praktyce (structuredClone, freeze, wzorce update)
- [x] 24 własny EventEmitter (on/off/once/emit, semantyka Node)
- [x] 25 debounce i throttle (implementacje + różnice)
- [ ] 25b warianty debounce/throttle: leading/trailing, cancel/flush, throttle na rAF
      (audyt: lodash docs — realne opcje produkcyjne, osobny poziom trudności)
- [x] 26 [D] debug: asynchroniczność (brakujący await, forEach+async, sekwencyjne await)
      (dopisane — audyt: kanon błędów async)
- [x] 27 rekurencja (drzewa, spłaszczanie, limity stosu)
- [ ] 27b trampolina i iteracyjne alternatywy rekurencji (unikanie przepełnienia stosu)
      (audyt: kanon — dopełnienie „limity stosu" z 27)
- [x] 28 JSON i serializacja (replacer/reviver, toJSON, cykle)
      (dopisane — audyt: javascript.info „JSON methods")
- [x] 29 liczby i precyzja (IEEE-754, EPSILON, zaokrąglanie, losowość)
      (dopisane — audyt: javascript.info „Numbers")
- [ ] 29b BigInt: literały n, arytmetyka, zakaz mieszania z number (TypeError),
      konwersje, kiedy używać (id, kwoty, > MAX_SAFE_INTEGER), czego brakuje (Math.*)
      (audyt: MDN BigInt — jedyny typ liczbowy nieobecny w tracku; domyka też
      uproszczenie looseEq z 03-hard)
- [x] 30 Date i czas (tworzenie, arytmetyka dat, formatowanie względne)
      (dopisane — audyt: javascript.info „Date and time")
- [x] 31 wyrażenia regularne: podstawy praktyczne (grupy, flagi, replace z funkcją)
      (dopisane — audyt: javascript.info RegExp + MDN)
- [ ] 31b regex zaawansowany: lookbehind (?<=)/(?<!), flaga y (sticky, tokenizacja),
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
- [ ] module-02 (mini-projekt: klient API z retry/timeout/kolejką, wieloplikowy)
- [ ] module-03 (feature: paginowany klient listy — fetch + cache Map + AbortController
      przy zmianie zapytania + debounce wyszukiwania; skleja 17/25/32/35) (audyt)
- [ ] module-04 (feature: mini state manager — pub/sub + niemutowalne aktualizacje
      + undo/redo na historii stanów; skleja 22/23/24) (audyt)
- [ ] module-05 (feature: rate limiter + kolejka zadań — throttle, pool współbieżności,
      batching, backoff przy retry; skleja 25/10/37/32) (audyt)

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
- [ ] 19b [O] optymalizacja komponentu: działający, ale wolny widok — memo/useMemo tam,
      gdzie trzeba, podnoszenie stanu, rozbicie komponentu (mierzone licznikiem renderów)
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
- [ ] 09b [O] optymalizacja: wczytanie całego pliku do pamięci → strumień; synchroniczne
      fs w pętli → równoległe/asynchroniczne (kod działa, ale nie skaluje się)
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
- [ ] 11b [O] optymalizacja zapytań: poprawne zapytanie zwracające dobry wynik, ale wolne
      — przepisz (indeks, JOIN zamiast podzapytania, LIMIT/paginacja); bramka: EXPLAIN
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

**Suma (minimum, nie limit): ~112 zagadnień ≈ 360–390 zadań + 10 testów modułowych.**
Sesje treści i audyty (tasks/prompts.md) mają obowiązek dopisywać pozycje, gdy źródła
pokazują więcej wariantów.
