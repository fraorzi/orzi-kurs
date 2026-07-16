# Moduł 01 — lokalna tablica zadań zespołu

Zadanie jest **wieloplikowe**. Uzupełnij pliki w `src/`. Testy importują wyłącznie
z `src/index.ts`, więc ten plik jest publiczną granicą feature’u.

Nie używaj fetch, efektów, zewnętrznego store ani ręcznej memoizacji. Wszystkie dane
są lokalne.

## Kontrakt domenowy

`src/types.ts` definiuje:

```ts
type TaskFilter = "all" | "open" | "done";

interface TeamTask {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

interface TaskState {
  readonly tasks: readonly TeamTask[];
  readonly filter: TaskFilter;
}
```

Akcje reduktora:

- `task_added` z gotowym rekordem zadania,
- `task_toggled` z ID,
- `task_deleted` z ID,
- `filter_changed` z filtrem.

## `src/reducer.ts`

Eksportuj `createInitialState(initialTasks)` i `taskReducer(state, action)`.

- inicjalizacja ustawia filtr `all`,
- reducer jest czysty i nie mutuje danych,
- dodanie dopisuje rekord,
- toggle tworzy nowy obiekt tylko dla wskazanego zadania,
- delete usuwa po ID,
- zmiana filtra nie kopiuje tablicy zadań.

## `src/selectors.ts`

Eksportuj:

```ts
selectVisibleTasks(state): readonly TeamTask[]
selectTaskCounts(state): { readonly open: number; readonly done: number }
```

Widoczna lista wynika z `tasks` i `filter`; nie zapisuj jej w stanie.

## `src/context.tsx`

Utwórz **dwa** contexty z defaultem `null`:

- stan,
- `Dispatch<TaskAction>`.

`TaskProvider` używa `useReducer(taskReducer, initialTasks, createInitialState)` i
składni providerów React 19. Eksportuj bezpieczne hooki `useTaskState` i
`useTaskDispatch`, rzucające `Brak TaskProvider` poza providerem.

## Komponenty

### `src/AddTaskForm.tsx`

- kontrolowane pole `Nowe zadanie`,
- przycisk `Dodaj`,
- ignorowanie tekstu pustego po `trim()`,
- `createId()` wywołane wyłącznie przy poprawnym submitcie,
- dispatch `task_added` i wyczyszczenie pola.

### `src/TaskFilters.tsx`

Trzy przyciski: `Wszystkie`, `Otwarte`, `Gotowe`. Bieżący filtr oznacz przez
`aria-pressed`. Kliknięcie dispatchuje `filter_changed`.

### `src/TaskSummary.tsx`

Pokaż dwa elementy `output` o nazwach `Otwarte zadania` i `Gotowe zadania`.
Wartości pobierz z selektora.

### `src/TaskList.tsx`

- renderuje zadania z `selectVisibleTasks`,
- checkbox ma dostępną nazwę równą tytułowi,
- zmiana checkboxa dispatchuje `task_toggled`,
- przycisk `Usuń {tytuł}` dispatchuje `task_deleted`,
- pusta lista pokazuje `Brak zadań dla tego filtra.`

### `src/TaskBoard.tsx`

Składa feature pod `TaskProvider`, renderuje nagłówek `Tablica zespołu` i pozostałe
komponenty. Otrzymuje `initialTasks` oraz `createId`.

## `src/index.ts`

Eksportuj `TaskBoard` i publiczne typy `TeamTask`, `TaskFilter`.
