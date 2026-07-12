# orzi-kurs — MVP todo

- [x] Scaffold (Next 16 + Tailwind 4 + Vitest + git init)
- [x] SPEC.md — kontrakty harnessu i konwencje zadań (+ debug, wieloplikowe)
- [x] Harness (Opus): runner, pipeline test→lint, bench, progress, auto-commit, CLI, API routes, verify:solutions
- [x] Treść JS (Fable): 01-closures, 02-array-methods, 03-promises, 04-async-await, 05-event-loop × easy/medium/hard (verify:solutions 15/15)
- [x] UI (Sonnet + frontend-design): sidebar, widoki zagadnienia/zadania, submit, wyniki, hinty, statusy
- [x] Kurykulum pełnego zakresu (tasks/curriculum.md) + prompty sesji (tasks/prompts.md)
- [x] Weryfikacja end-to-end: build OK, strona główna/teoria/zadanie OK, submit → NIEZALICZONE 0/6 z nazwami testów, hinty odkrywane, konsola czysta, 0 italików/gradientów, progress wyzerowany
- [ ] Pierwszy commit (propozycja złożona, czeka na akceptację)

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
