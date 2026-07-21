# orzi-kurs — historyczny dziennik realizacji

Ten plik zachowuje checkpointy z budowy repo. Aktualny, zweryfikowany stan curriculum
jest w `docs/curriculum/FINAL_AUDIT.md`; wpisy „zostało” w starszych sekcjach opisują
stan z dnia danej sesji, a nie bieżący backlog.

- [x] Scaffold (Next 16 + Tailwind 4 + Vitest + git init)
- [x] SPEC.md — kontrakty harnessu i konwencje zadań (+ debug, wieloplikowe)
- [x] Harness (Opus): runner, pipeline test→lint, bench, progress, auto-commit, CLI, API routes, verify:solutions
- [x] Treść JS (Fable): 01-closures, 02-array-methods, 03-promises, 04-async-await, 05-event-loop × easy/medium/hard (verify:solutions 15/15)
- [x] UI (Sonnet + frontend-design): sidebar, widoki zagadnienia/zadania, submit, wyniki, hinty, statusy
- [x] Kurykulum pełnego zakresu (tasks/curriculum.md) + prompty sesji (tasks/prompts.md)
- [x] Weryfikacja end-to-end: build OK, strona główna/teoria/zadanie OK, submit → NIEZALICZONE 0/6 z nazwami testów, hinty odkrywane, konsola czysta, 0 italików/gradientów, progress wyzerowany
- [x] Pierwszy commit i kolejne branche curriculum

## Review

MVP kompletny. Pipeline sprawdzania deterministyczny (vitest + ESLint + bench),
treść w 100% kurowana ze źródeł i zweryfikowana wzorcami (15/15). UI bez generycznej
AI-estetyki, jeden ciemny motyw, monospace. Znane ograniczenia: zadania wieloplikowe
wymagają rozszerzenia harnessu (SPEC, zrobi to sesja js/module-01); e2e dla tracku
next odroczone; audyt treści (Prompt 2) do odpalenia po każdym module.

## Sesja treści: js 16–19 (obsługa błędów, Map/Set, WeakMap/WeakSet, [D] debug)

- [x] Odhaczone 13–15 (gotowe z poprzedniej sesji, potwierdzona bramka: startery oblewają)
- [x] 16 obsługa błędów — try/catch/finally, custom errors, hierarchia + cause + rethrow
      (javascript.info error-handling/custom-errors, MDN)
- [x] 17 Map i Set — dedup/zliczanie, anagramy + konwersje, operacje na zbiorach O(n) + bench
      (javascript.info map-set: unique/aclean)
- [x] 18 WeakMap/WeakSet — read tracker, read log + prywatne saldo, memoizacja per obiekt
      (javascript.info weakmap-weakset)
- [x] 19 [D] debug — off-by-one, stale closure + mutacja podczas iteracji, O(n²)→O(n) z benchem
- [x] Bramka: verify:solutions js = 57/57 green; każdy starter oblewa (potwierdzone vitest)
- Dopisane do curriculum (audyt): 16b błędy async, 17b operacje na zbiorach,
  17c Object.groupBy/Map.groupBy, 18b WeakRef/FinalizationRegistry
- Nie zrobione (przyszłe sesje): module-01 (wieloplikowy), 20+ (iteratory, generatory, ...),
  audyt items 16b/17b/17c/18b

## Sesja treści: js 20–23 (iteratory, generatory, deskryptory, immutability)

- [x] 20 iteratory/iterables — range iterable + toArray / naturals + take (lazy) /
      LinkedList iterowalna (javascript.info „Iterables")
- [x] 21 generatory — range + take / flatten + chain (yield*) / fibonacci + accumulator (next(arg))
      (javascript.info „Generators")
- [x] 22 deskryptory/gettery-settery — defineConstant + hide / fullName + temperature akcesory /
      observable (wzorzec observe) (javascript.info „Property descriptors" + „getters/setters")
- [x] 23 immutability — updateField + addItem / deepClone + setIn / deepFreeze
      (React/Redux update patterns, structuredClone, Object.freeze)
- [x] Bramka: verify:solutions js = 69/69 green; wszystkie 12 nowych starterów oblewa
- Dopisane do curriculum (audyt): 21b async generatory, 22b Proxy i Reflect
- Ustalenie harnessowe: catalog.ts traktuje `module-*` jako POZIOM wewnątrz topicu
  (nie top-level task dir jak w rysunku SPEC). module-01/02 wymagają decyzji o układzie
  (topic `module-01/` + poziom `module-01/` albo zmiana catalog.ts) — do rozstrzygnięcia
  z właścicielem harnessu; dlatego odłożone.
- Nie zrobione: module-01/02, 24–33, audyt items 16b/17b/17c/18b/21b/22b

## Sesja treści: js 24–27 (EventEmitter, debounce/throttle, [D] async, rekurencja)

- [x] 24 EventEmitter — on/emit/off / once+unsubscribe+wiele args / klasa EventEmitter
      (listenerCount, removeAllListeners, emit→bool) (Node events, javascript.info pub/sub)
- [x] 25 debounce/throttle — debounce trailing / throttle leading / debounce {leading}+cancel
      (lodash-lite; testy real-timer 30ms + margines 70ms, stabilne 3/3 przebiegi)
- [x] 26 [D] async — brakujący await / forEach+async+map obietnic / sekwencyjny→równoległy
      (test współbieżności licznikiem maxActive, nie czasem)
- [x] 27 rekurencja — factorial+pow / sumNested+treeSum / flattenTree+findPath (DFS, backtracking)
- [x] Bramka: verify:solutions js = 81/81 green; wszystkie 12 nowych starterów oblewa;
      startery [D] 26 lint-clean, reszta tylko todo-tag (jak wzorzec)
- Dopisane do curriculum (audyt): 25b warianty debounce/throttle, 27b trampolina
- Nie zrobione: module-01/02, 28–33 (JSON, liczby, Date, regex, fetch, [D] perf),
  audyt items 16b/17b/17c/18b/21b/22b/25b/27b

## Sesja treści: js 28–31 (JSON, liczby, Date, regex)

- [x] 28 JSON — stringifyFields+safeParse / replacer(hide secrets)+reviver(dates) /
      safeStringify odporny na cykle (WeakSet) (javascript.info „JSON methods")
- [x] 29 liczby — roundTo+isInteger / approxEqual(EPSILON)+toFixedNumber /
      parseMoney+formatMoney (grosze jako int) (javascript.info „Numbers")
- [x] 30 Date — addDays+daysBetween / isWeekend+formatISODate (UTC) /
      relativeTime dobór jednostki (Intl.RelativeTimeFormat) — testy UTC, deterministyczne
- [x] 31 regex — extractNumbers+isHexColor / capitalizeWords+censor(new RegExp) /
      parseDate(named groups)+extractHashtags(matchAll) (javascript.info RegExp + MDN)
- [x] Bramka: verify:solutions js = 93/93 green; wszystkie 12 nowych starterów oblewa
- UWAGA sonarjs/super-linear-regex: reguła (error) blokuje regexy z backtrackingiem.
  Odrzucone: formatThousands `\B(?=(\d{3})+...)`, parseQuery `[^=&]+=[^&]*`.
  Zastąpione lint-safe: censor (new RegExp z danych), extractHashtags (#(?<tag>\w+)).
  Bezpieczne wzorce: pojedynczy kwantyfikator, klasy znaków, literał+grupa; unikać
  sąsiednich chciwych `X+` przy granicy.
- Nie zrobione: module-01/02, 32–33 (fetch/AbortController, [D] perf/pamięć),
  audyt items 16b/17b/17c/18b/21b/22b/25b/27b

## Sesja treści: js 32–33 (fetch/AbortController, [D] wydajność i pamięć)

- [x] 32 fetch — fetchJson+postJson (res.ok!) / fetchWithTimeout+cancellableFetch
      (AbortController) / fetchWithRetry (5xx+sieć ponawiaj, 4xx nie) (MDN fetch/AbortController)
- [x] 33 [D] perf — namesByIds (find w pętli → Map index, bench) /
      subscribeAll (wyciek słuchaczy: unsubscribe wypisywał tylko pierwsze zdarzenie) /
      processQueue (shift() → O(n²), bench)
- Testy fetch: podmiana `globalThis.fetch` na atrapę + prawdziwe `Response`/`AbortController`
  (Node 22). Zero sieci. Atrapa `hangingFetch` odrzuca dopiero na `signal` abort.

### ⚠ Ustalenie o `expectScaling` (ważne dla przyszłych [D]/bench)
`expectScaling` mierzy NAJPIERW mały rozmiar, potem duży. Mały przebieg łapie JIT
na zimno → jego czas jest zawyżony → **ratio wychodzi zaniżone**. Skutek: zbyt małe
`sizes` NIE złapią O(n²).
- Realny przypadek: `namesByIds` (find w pętli) przy `sizes: [1000, 10000]` dał ratio 13.7×
  (próg 40 → starter przechodził „od urodzenia”!). Przy `[2000, 20000]` → 124–155× (oblewa),
  a rozwiązanie liniowe 11.8× (przechodzi). Poprawione.
- Wniosek: dla tanich operacji wewnętrznych (porównanie pola) używaj `sizes: [2000, 20000]`
  i ZAWSZE sprawdzaj oba kierunki: starter musi oblać, `_solution` przejść (kilka przebiegów).

## STAN JS: KOMPLET numerowanych zagadnień (01–33)

- `pnpm verify:solutions js` → **99/99 green**
- wszystkie **99 starterów oblewa** (zweryfikowane `vitest run tracks/js` → 99 failed)
- zostaje w js: `module-01`, `module-02` (wieloplikowe) + pozycje z audytu
  (16b, 17b, 17c, 18b, 21b, 22b, 25b, 27b)
- `module-01/02` zablokowane decyzją o układzie katalogów (patrz sesja 20–23:
  catalog.ts traktuje `module-*` jako poziom wewnątrz topicu)

## Sesja treści: js 34–37 [O] — pierwsze zagadnienia OPTYMALIZACYJNE

Nowy typ `[O]`: starter DZIAŁA POPRAWNIE (przechodzi testy poprawności), oblewa tylko
bramkę wydajności. To realizacja prośby usera o zadania z optymalizacji, nie tylko debug.

- [x] 34 [O] struktury danych — countInBoth (includes→Set) / uniqueByEmail (findIndex→Set) /
      groupSum (filter-per-cat→jedno przejście). Wszystkie bench.
- [x] 35 [O] powtórzona praca — totalCost (memoizacja, licznik wywołań) /
      styleItems (wyciągnięcie z pętli, licznik) / firstUnique (indexOf²→Map, bench)
- [x] 36 [O] alokacje/kopie — flatten ([...acc]→push, bench) / mergeAll ({...acc}→Object.assign, bench) /
      removeAll (filter-w-reduce→Set, bench)
- [x] 37 [O] async — loadAll (sekwencyjnie→Promise.all, licznik maxActive) /
      pooledMap (pool z limitem, licznik) / batchFetch (paczkowanie, licznik wywołań)
- [x] Bramka: verify:solutions js = 111/111; każdy [O] starter PRZECHODZI poprawność
      i OBLEWA bench/licznik (zweryfikowane per poziom)

### Ustalenia z sesji (ważne dla przyszłych [O])
- Bramki bench [O] dobierane empirycznie przy small-first (JIT-caveat): sizes [2000,20000]
  dla większości; slow 74–277×, fast 3.9–13.5×.
- WYJĄTEK: mergeAll ({...acc} spread) jest ekstremalnie wolny (6.5s przy n=10000) →
  ryzyko timeoutu testu. Zmniejszono do [500,5000] (broken ~1.5s×4≈6s < 15s testTimeout,
  slow 277×). Ogólnie: dla O(n²) na KOPIACH obiektów używać mniejszych sizes.
- Startery [O] z „przełącznikiem optymalizacji" (limit, size) mają nieużywany parametr →
  ostrzeżenie no-unused-vars (severity 1), NIE error. Bramka (liczy tylko errory) przechodzi.
- Współbieżność/liczba wywołań mierzone LICZNIKIEM (maxActive / calls), nie czasem —
  deterministyczne, zero flakiness (zgodnie z wytycznymi testów).

## STAN JS: 01–37 (numerowane + pierwsze [O])
- `pnpm verify:solutions js` → **111/111 green**
- zostaje: module-01/02 (wieloplikowe, blokada układu) + audyt 16b/17b/17c/18b/21b/22b/25b/27b
- w innych trackach dopisane pozycje [O]: react 19b, node 09b, mysql 11b (do zrobienia w swoich modułach)

## Sesja UI/UX: pełna przebudowa (impeccable, warm-graphite/iris)

Zatwierdzony kierunek przez klikalną makietę. Drill-down IA (home → roadmapa → zagadnienie → focus),
sidebar-akordeon + `[` + `⌘K`. Warm-graphite OKLCH + akcent iris, jeden sans + mono na kod.
Zgodne z impeccable `product` register. Właściciel: `app/**` (bez `app/api` i harness).

- [x] 1. `globals.css` — tokeny OKLCH + klasy komponentów (port z makiety)
- [x] 2. `app/lib/tracks.ts` — meta tracków (kategoria/kolor/planned) + helpery numer/slug/tag [D]/[O]
- [x] 3. `app/layout.tsx` — fonty next/font (Geist + JetBrains Mono) + Shell
- [x] 4. `app/components/Shell.tsx` (client) — rail collapse, ⌘K, keyboard, fetch katalogu
- [x] 5. `app/components/Sidebar.tsx` — akordeon bieżącego tracku
- [x] 6. `app/components/CommandPalette.tsx` — skok do zadania
- [x] 7. `app/page.tsx` — home: aktywny track + „Wkrótce"
- [x] 8. `app/track/[track]/page.tsx` + `Roadmap.tsx` — roadmapa z filtrami (NOWA route)
- [x] 9. `app/track/[track]/[topic]/page.tsx` — restyle (teoria + poziomy)
- [x] 10. `.../[level]/TaskView.tsx` — focus mode + wyniki
- [x] 11. `Markdown` className; usunięty martwy `StatusBadge`
- [x] 12. Weryfikacja dev server: home, roadmapa+filtry, zagadnienie+akordeon, focus mode, realny submit (pipeline OK, panel wyników), ⌘K+filtr+nawigacja. tsc + eslint czyste.

### Review
Pełny redesign wdrożony w `app/**`, zero zmian w `app/api`/harness. Kontrakty katalogu bez zmian;
kategorie i typy `[D]/[O]` wyprowadzane client-side z ID (`app/lib/tracks.ts`). Nowa route `app/track/[track]`.
Bug złapany w trakcie: kolizja klasy `.active` (home-card) z `.lvl.active` (poziom) → rename `.active-track`.
Uwaga cache: zmiany w `globals.css` wymagały `rm -rf .next` + restart (Turbopack trzymał stary chunk CSS).
Znane do zrobienia: mobile (rail off-canvas bez hamburgera — desktop-first OK), StatusBadge usunięty.
Efekt uboczny weryfikacji: testowy submit zapisał `js/08-closures/easy: failed` do progress.json.

## Sesja: odblokowanie modułów wieloplikowych + js/module-01

Blokada zdiagnozowana: harness JUŻ obsługiwał wieloplikowe (`paths.ts` swap `src/`↔`_solution/`,
lint `src/**`, `readSolutionText`; `catalog.ts` `isTaskDir` akceptuje `src/`). Jedyny problem:
`collectLevels` rozpoznawał poziomy tylko jako podkatalogi w LEVEL_ORDER lub `module-*` →
moduł per SPEC (topic `module-01/` z plikami bezpośrednio w środku) dawał `levels.length===0`
i znikał z katalogu. Routing sztywno `track/topic/level`.

### Decyzje (zatwierdzone przez usera)
- Układ: moduł = **topic** `tracks/js/module-01/` + jeden **poziom** `module/` w środku.
  Trzyma uniform `track/topic/level`, zero zmian w routingu.
- Zakres: tylko `module-01` referencyjny (wzorzec dla 02–05).

### Zmiany
- [x] `harness/catalog.ts` — `collectLevels`: `isLevel` rozpoznaje bare `module`
      (oprócz `module-*` i LEVEL_ORDER). 1 linia.
- [x] `app/lib/tracks.ts` — `LEVEL_DESC["module"]` = "projekt wieloplikowy — łączy poznane wzorce".
- [x] `tracks/js/module-01/` — README (teoria warstwowa) + `module/{task.md, hints.md, run.test.js,
      src/{events,store,index}.js, _solution/{...}}`. Skleja closures + Map/Set + immutability + pub/sub.

### Weryfikacja
- [x] Starter oblewa 12/12 (vitest, TypeError na undefined API).
- [x] Lint startera: 2× sonarjs/todo-tag (error, zgodne — starter ma oblać) + 1 warn unused-vars.
- [x] `verify:solutions js/module-01` → 1/1; pełny `verify:solutions js` → **154/154** (było 153).
- [x] `buildCatalog()` pokazuje topic `js/module-01` (tytuł z README H1, poziom `module`), 52 topiki js.
- [x] tsc + eslint (catalog.ts, tracks.ts) czyste.
- [x] Dev server smoke: sidebar 52, strona topicu (README + poziom `module`), focus `/track/js/module-01/module`
      renderuje task.md; starter path = KATALOG `.../module/src` (wieloplikowy).
- [x] Realny submit przez UI → POST /api/submit 200, `passed:false`, 12/12 fail, lint todo-tag. Pipeline OK.
- [x] progress.json przywrócony (submit zapisał `js/module-01/module: failed`).

### Do zrobienia (przyszłe sesje)
- js/module-02..05 (klient API, paginacja, state manager, rate limiter) — ten sam wzorzec układu.
- module-01 dla innych tracków (ts, react, next, node, strapi, mysql) gdy ruszą.

### Review (prompt 2) — bugi UI przy topikach 1-poziomowych, naprawione
- [x] `Roadmap.tsx` zakładał sztywno 3 poziomy easy/medium/hard: moduł nigdy nie byłby „done"
      (done===3), kropki pokazywały 3× not-started zamiast statusu `module`, ułamek „x/3".
      Fix: iteracja po `topic.levels`, `done === topic.levels.length`, `{done}/{levels.length}`.
- [x] `topicNumber("js/module-01")` zwracał "" → pusta kolumna numeru w sidebar/roadmap,
      wiodąca spacja w breadcrumbach. Fix: `module-NN` → `M{N}` (2 znaki, mieści się w 19px).
- [x] Nit z listy wyżej: TaskView pokazuje „Katalog startera", gdy `starterPath` kończy się `/src`.
- [x] Weryfikacja: tsc + eslint czyste, `verify:solutions js` 154/154, browser smoke
      (roadmap `M1 … 0/1` + 1 kropka `module: nie zaczęte`, topic page, obie labelki startera).

## Sesja treści: js module-02..05 (domknięcie tracku js) — wieloplikowe

Cztery mini-projekty w konwencji module-01 (topic `module-NN/` + poziom `module/`,
`src/` ↔ `_solution/`, test importuje z `./src/index.js`). Zero zmian w harness/app —
`collectLevels` już rozpoznaje bare `module`.

- [x] module-02 — klient API: `http.js` (requestJson + HttpError: timeout AbortController,
      retry z backoffem, 4xx bez ponawiania / 5xx+sieć ponawia) + `queue.js` (pool
      concurrency, pump) + `index.js` (createApiClient). Skleja 32/10/16/37.
- [x] module-03 — paginowany klient listy: `cache.js` (Map po (query,page)) +
      `debounce.js` + `index.js` (createListClient: search anuluje in-flight Abortem,
      next dokłada stronę, cache omija fetch). Skleja 17/25/32/35.
- [x] module-04 — mini state manager: `history.js` (past/present/future undo/redo,
      push czyści future) + `store.js` (pub/sub Set + niemutowalny set/update, undo/redo
      + canUndo/canRedo gettery) + `index.js`. Skleja 22/23/24.
- [x] module-05 — harmonogram: `pool.js` (concurrency + maxActive) + `retry.js`
      (withRetry backoff) + `batch.js` (createBatcher DataLoader-style, flush po maxSize)
      + `index.js` (createScheduler: retry wewnątrz slotu poolu). Skleja 25/10/37/32.
- [x] Bramka per moduł: solution przechodzi test+lint; starter oblewa oba
      (10/6/11/9 failów testów + todo-tag errory). `verify:solutions js` = **158/158**.
- [x] `buildCatalog()` pokazuje M1..M5 (poziom `module`, tytuły z README H1); js = 56 topików.

### Ustalenia testowe (determinizm async)
- Atrapa fetch przez wstrzykiwany `fetchImpl` (nie globalny swap) — czyste, testowalne.
  `new Response(JSON.stringify(body), { status })` z Node 22; abort przez listener na `signal`.
- Retry/backoff testowane LICZNIKIEM wywołań przy `backoffMs: 0` — zero zależności od czasu.
- Współbieżność mierzona `maxActive` (deterministyczna: pool startuje dokładnie N zadań
  synchronicznie zanim którekolwiek await ustąpi). Anulowanie przez `signal.aborted`
  sprawdzane synchronicznie po drugim wywołaniu. Debounce: jedyny realny timer (20ms okno,
  sprawdzenie po 50ms) — wg sprawdzonego wzorca z topicu 25.

### STAN JS: KOMPLET (01–37 + audyt b/c + module-01..05)
- `verify:solutions js` → **158/158**; track js domknięty.
- Do zrobienia (inne tracki): ts/react/next/node/strapi/mysql — numerowane + własne module-NN.

## Sesja treści: ts 01–12 + module-01 (bramka typów w harnessie)

### Harness (rozszerzenie przed treścią, subagent Opus)
- [x] `harness/typecheck.ts` — `tsc --noEmit` na plikach zadania (starter/src + run.test,
      bez `_solution*`), generowany standalone tsconfig (strict, Bundler, `@harness/*`),
      dla zadań `.js` NIE odpala tsc (track js bez spowolnienia: nadal 158/158).
- [x] `SubmitResult.typecheck.errors` + pipeline `passed = testy && lint && typecheck`;
      CLI i UI pokazują sekcję błędów typów.
- [x] `harness/type-assert.ts` — `Equal/Expect/NotEqual/ExpectFalse/IsAny/NotAny`
      (styl type-challenges), alias `@harness/type-assert` działa w vitest i w tsc.
- [x] Smoke: `_smoke/03-ts-single`, `_smoke/04-ts-multi` — verify 4/4, starter oblewa
      z widocznym `type error [TS2344]`.
- Konwencja: `run.test.ts` importuje `./starter` (bez rozszerzenia), wieloplikowe `./src/index`.
- `pnpm lint` i tsconfig repo wykluczają `tracks/` (startery mają celowe TODO/błędy);
      lint zadań leci przez ESLint API w runnerze.

### Treść (01–12 + module-01, verify:solutions ts = 37/37)
- [x] 01 typy podstawowe / 02 unie+narrowing / 03 obiekty / 04 funkcje / 05 generyki
- [x] 06 generic constraints — longest/getProp/ApiResponse<T=null> · pluck/indexBy/countBy/sumBy
      (`K extends PropertyKey, T extends Record<K, number>`) · typowany EventBus (hard)
- [x] 07 utility types (dokończone hard: FormState<T> — Partial+Record+Readonly, pick/omit)
- [x] 08 mapped types — MyPartial/MyReadonly/Mutable/Nullable · Prettify/Optional/RequiredOnly
      + applyDefaults · DeepReadonly/DeepPartial + deepFreeze/deepMerge (hard)
- [x] 09 conditional types — Exclude/Extract/NonNullable/ElementType · infer: ReturnType/
      Parameters/Awaited/FirstParam + once/resolveAll · KeysOfType/PickByType/DeepPartialSafe
- [x] 10 template literal types (dokończone medium: Getters/ChangeHandlers/WithoutInternal
      przez key remapping; hard: typowany router PathParams<P> przez rekurencyjny infer)
- [x] 11 klasy / 12 enums vs const objects + satisfies
- [x] module-01 — typowany moduł użytkowników (types/validate/repository/index):
      Result jako unia rozłączna, strażniki typu, `#private`, wstrzyknięty zegar
- [x] Bramka: verify ts 37/37; KAŻDY starter oblewa (skrypt check-starters w scratchpadzie);
      js nadal 158/158; `pnpm lint` i `pnpm build` zielone.

### Poprawki merytoryczne (zweryfikowane eksperymentalnie tsc, nie „z pamięci”)
- ts/05 README + test: `identity("abc")` daje **"abc"**, nie `string` — literał przeżywa
  w `const`, ginie w `let` i w polu obiektu/krotce. Poprzednia treść kłamała.
- ts/06: `longest("kot","pies")` → `"kot" | "pies"` (nie `string`) — ograniczenie nie rozszerza.
- ts/06: mapa zdarzeń musi być `type`, nie `interface` — interfejs nie ma niejawnej index
  signature, więc oblewa `T extends Record<string, unknown>`. Dopisane do README+task.
- ts/09 medium: `infer` w pozycji pierwszego parametru (`(first: infer P, ...rest: never[])`)
  daje `never` dla funkcji z 2+ parametrami — FirstParam trzeba robić dwustopniowo.
- ts/09 medium: `values: T` na literale tablicowym wnioskuje tablicę unii, nie krotkę —
  potrzebne `readonly [...T]`.
- ts/08 hard: `DeepPartial` na `string[]` daje `(string|undefined)[]` (homomorficzne
  mapowanie) — zostawione CELOWO jako pułapka, naprawiane w 09/hard przez DeepPartialSafe.
- ts/08 hard test: zapis do zamrożonego pola RZUCA TypeError (moduły ESM = strict mode).

### Zostało w tracku ts
- Pozycje audytowe: 02b, 03b, 06b (const type params, NoInfer), 10b, 10c, 13b, 13c, 14b.
- 13 moduły/.d.ts, 14 [D] debug typów, 15 [O] optymalizacja, 16 async, 17 branded types,
  18 type-challenges, module-02 (typowany klient API).
