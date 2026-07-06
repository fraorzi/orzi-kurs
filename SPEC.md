# orzi-kurs — SPEC

Lokalna apka do nauki JS/TS/React/Next/Strapi/MySQL. Zadania edytowane w WebStormie,
submit z UI lub CLI, sprawdzanie deterministyczne (testy + lint + bench), zero AI w runtime.

## Struktura repo

```
orzi-kurs/
├─ app/                    # Next 16 App Router — dashboard + API routes
│  └─ api/                 # własność harnessu
├─ harness/                # runner, bench, progress, cli, catalog
├─ tracks/
│  ├─ _smoke/              # wewnętrzny track do testów harnessu (prefix "_" = ukryty w UI)
│  ├─ js/
│  │  ├─ 01-closures/
│  │  │  ├─ README.md      # teoria zagadnienia (PL)
│  │  │  ├─ easy/
│  │  │  │  ├─ task.md     # polecenie (PL)
│  │  │  │  ├─ starter.js  # JEDYNY plik edytowany przez ucznia
│  │  │  │  ├─ run.test.js # testy vitest, importują ./starter.js
│  │  │  │  ├─ hints.md    # sekcje "## Hint 1", "## Hint 2", ...
│  │  │  │  └─ _solution.js# wzorzec (UI pokazuje dopiero po zaliczeniu)
│  │  │  ├─ medium/ …
│  │  │  └─ hard/ …
│  │  ├─ module-01/        # duże zadanie po ~10 zagadnieniach, w kategorii
│  │  └─ …
│  └─ combined/            # zadania łączące tracki (ts-react-01, next-strapi-01, …)
├─ progress.json
└─ SPEC.md
```

- Task ID: `js/01-closures/easy` (ścieżka względem `tracks/`).
- Kolejność zagadnień: prefiks numeryczny katalogu.
- Poziomy zawsze: `easy` → `medium` → `hard`. Moduł: katalog `module-NN` z tym samym układem co poziom (task.md, starter, testy).

## Pipeline submitu

1. **Vitest** na katalogu zadania (`run.test.js`). Testy = wymagania z opisowymi polskimi
   nazwami + custom komunikaty asercji. Benchmarki skalowania są zwykłymi testami
   używającymi helperów z `@harness/bench`.
2. **ESLint** na `starter.js` (typescript-eslint + sonarjs). Errors blokują zaliczenie,
   warnings tylko raportowane.
3. Zaliczenie = wszystkie testy green **i** zero lint errors.
4. Po zaliczeniu: zapis do `progress.json` + auto-commit
   `git add <taskdir> progress.json && git commit -m "solve: <taskId>"`.
   Bez Co-Authored-By. Commit tylko przy przejściu z fail→pass (nie przy ponownym pass).

## Kontrakty TypeScript (harness/types.ts)

```ts
export type Level = "easy" | "medium" | "hard";

export interface TestResult {
  name: string;                 // pełna nazwa testu (describe > it)
  status: "pass" | "fail";
  message?: string;             // komunikat asercji przy fail
}

export interface LintIssue { ruleId: string; message: string; line: number }

export interface SubmitResult {
  taskId: string;
  passed: boolean;
  tests: TestResult[];
  lint: { errors: LintIssue[]; warnings: LintIssue[] };
  durationMs: number;
  error?: string;               // błąd infrastruktury (np. syntax error przy imporcie)
}

export interface TaskProgress {
  status: "passed" | "failed";
  attempts: number;
  firstPassedAt?: string;       // ISO
  lastRunAt: string;            // ISO
}
// progress.json: Record<taskId, TaskProgress>
```

## API routes (app/api/)

- `GET /api/catalog` → drzewo tracków (bez `_`-prefiksowanych) + merge z progress.json:
  `{ tracks: [{ id, topics: [{ id, title (H1 z README), levels: [{ id, status }] }] }] }`
- `GET /api/task?id=js/01-closures/easy` →
  `{ readme, taskMd, hintsTotal, starterPath (absolutna), solution: string | null }`
  (`solution` ≠ null tylko gdy zadanie zaliczone)
- `GET /api/hint?id=<taskId>&n=1` → `{ hint: string }` (treść sekcji "## Hint n")
- `POST /api/submit` body `{ taskId }` → `SubmitResult`

## harness/bench.ts

```ts
// Oblewa z opisowym komunikatem, np.:
// "czas wzrósł ~94× przy 10× większym wejściu — wygląda na O(n²), oczekiwano O(n)"
export function expectScaling<T>(opts: {
  fn: (input: T) => unknown;
  makeInput: (size: number) => T;
  sizes: [number, number];      // np. [1_000, 10_000]
  expect: "linear" | "constant";
  maxRatio?: number;            // default: linear → 40 przy 10×, constant → 5
}): void;
// Implementacja: warmup 1×, potem mediana z 3 przebiegów per size, performance.now().
// Progi celowo luźne — mają odróżniać klasy złożoności, nie mikro-optymalizacje.
```

## verify:solutions

`pnpm verify:solutions [trackId]` — dla każdego zadania: backup `starter.js`,
podmiana na `_solution.js`, run pipeline'u, przywrócenie startera (finally).
Dowodzi, że każdy wzorzec przechodzi swoje testy. Musi być zielone przed dodaniem treści.

## Skrypty (package.json)

- `pnpm dev` — dashboard
- `pnpm submit <taskId>` — pipeline z CLI (ten sam kod co API)
- `pnpm verify:solutions [trackId]`

## Zagadnienia debugowe i wieloplikowe

- Zagadnienia `[D]` (debug): starter zawiera KOMPLETNY, zepsuty lub nieoptymalny kod
  z realnego kanonu błędów; easy = bug oczywisty, medium = subtelny błąd logiczny,
  hard = problem wydajnościowy/pamięciowy łapany benchmarkiem. Rozmieszczenie wg
  tasks/curriculum.md (co ~5 zagadnień), dodatkowo zwykłe zadania mogą być typu „napraw".
- Zadania hard i module-NN mogą być wieloplikowe: starter to wtedy katalog `src/`
  (testy importują z `./src/index.js`), wzorzec to `_solution/` (katalog o tej samej
  strukturze). Lint obejmuje wtedy cały `src/`. Pełny zakres: tasks/curriculum.md.

## Konwencje treści zadań

- Zadania kurowane ze sprawdzonych źródeł (javascript.info, Exercism, MDN, oficjalne
  docs) — nigdy wymyślane od zera. Testy pisane pod wzorcowe rozwiązania.
- task.md: polecenie + sygnatura funkcji + przykłady wejście/wyjście. Poziomy:
  easy = niemal do przepisania z README, medium = wariacja, hard = wymaga zrozumienia.
- Feedback: nazwy testów opisują wymaganie ("zwraca nową tablicę zamiast mutować
  wejście"), asercje mają custom komunikaty tłumaczące przyczynę.
- Styling w zadaniach (gdy dojdą tracki UI): Tailwind 4; wyjątek — zadania uczące
  wprost `style` w JS/TS/React.

## Podział własności plików (równoległa praca)

- Harness (Opus): `harness/`, `app/api/`, `vitest.config.ts`, `eslint.config.mjs`,
  scripts w `package.json`, `tracks/_smoke/`.
- Treść (Fable): `tracks/**` poza `_smoke`.
- UI (Sonnet): `app/**` poza `app/api/`.
