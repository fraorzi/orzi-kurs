# Audyt curriculum React

Data audytu: 2026-07-16.

## Wniosek

Plan wejściowy ma dobry zakres, ale sama lista hooków nie tworzy ścieżki intern → mid.
Kolejność musi odzwierciedlać model mentalny Reacta: najpierw czyste komponenty i
tożsamość drzewa, potem snapshot stanu i architektura danych, dopiero następnie
efekty jako synchronizacja z systemem zewnętrznym.

Poziom mid oznacza tu nie znajomość większej liczby hooków, lecz umiejętność:

- wybrania właściciela stanu i usunięcia stanu pochodnego,
- zamodelowania nieosiągalnych kombinacji UI,
- zaprojektowania dostępnego kontraktu komponentu,
- rozdzielenia zdarzenia użytkownika od efektu synchronizacji,
- obsłużenia pending/error/empty/success i anulowania pracy,
- przetestowania zachowania przez role, nazwy i rzeczywiste interakcje,
- zmierzenia renderów przed dodaniem memoizacji.

## Wersja i granice stabilności

Repo używa React 19.2.4 i React DOM 19.2.4. Curriculum obejmuje stabilne API 19.2,
w tym Actions, `useActionState`, `useFormStatus`, `useOptimistic`,
`useEffectEvent` i `<Activity>`.

API oznaczone przez oficjalną dokumentację jako Canary lub Experimental nie wchodzą
do rdzenia. Dotyczy to m.in. `<ViewTransition>` i eksperymentalnych taint APIs.
Mogą wrócić jako przyszły elective po stabilizacji.

React Compiler jest częścią ścieżki przed ręczną memoizacją. Uczeń najpierw poznaje
reguły czystości i diagnozuje, czy komponent został skompilowany, a dopiero potem
sięga po `memo`, `useMemo` i `useCallback` tam, gdzie pomiar albo kontrakt referencji
tego wymaga.

## Kolejność

1. Describing UI: komponenty, props, JSX, listy, keys, purity.
2. Interactivity: zdarzenia, snapshot stanu, batching i niemutowalne aktualizacje.
3. Managing state: formularze, stan pochodny, reducer, context i modelowanie UI.
4. Escape hatches: refy i efekty wyłącznie do systemów zewnętrznych.
5. React 19 async UI: Actions, optimistic UI, Suspense i external stores.
6. API komponentów: custom hooks, kompozycja, portale, transitions i imperative refs.
7. Jakość: Compiler, pomiar renderów, testy zachowania, dostępność i wydajność list.
8. Elective: TanStack Query jako gotowa architektura server state.
9. Moduły końcowe łączące kilka warstw bez podawania kompletnej architektury wprost.

## Strategia testów

Testy używają jsdom, React Testing Library i `user-event`. Zapytania po roli i nazwie
dostępnej są domyślne, ponieważ jednocześnie weryfikują zachowanie i część semantyki
interfejsu. `fireEvent` pozostaje narzędziem niskopoziomowym dla zdarzeń, których
`user-event` nie modeluje.

Każde zadanie TSX przechodzi trzy niezależne bramki:

- Vitest w jsdom,
- ESLint z regułami hooków i React Compilera,
- ścisły `tsc --noEmit` z `jsx: react-jsx`.

Helper `@harness/react-test` zapewnia cleanup, matchery DOM, `renderWithUser` oraz
licznik commitów oparty na oficjalnym komponencie `<Profiler>`. Zadania `[O]`
porównują liczbę renderów/commitów lub wywołań kosztownej pracy, a nie kruche czasy.

## Integracja dostępności

Dostępność nie jest pojedynczym końcowym rozdziałem. Formularze od początku wymagają
etykiet, komunikatów błędów i obsługi focusu. Dedykowany blok później łączy klawiaturę,
dialog, live regions i testy regresji dostępności w większe scenariusze.

## Typowe luki kursów, których unikamy

- uczenie `useEffect` jako domyślnego miejsca każdej logiki,
- kopiowanie propsów do stanu i synchronizowanie ich efektem,
- traktowanie indeksu tablicy jako bezpiecznego `key`,
- optymalizacja przez `memo` bez pomiaru i bez zrozumienia identity,
- testowanie klas CSS, nazw funkcji i prywatnego stanu zamiast zachowania,
- pomijanie błędów, pustych stanów, anulowania i podwójnych wywołań w Strict Mode,
- uczenie wszystkich nowych API jako obowiązkowego core bez oznaczenia stabilności.

## Kryterium ukończenia

Track jest gotowy, gdy:

- każde rozwiązanie i każdy pierwotny starter przechodzi właściwą bramkę,
- wszystkie tematy mają teorię, zastosowania, ograniczenia i pułapki,
- testy zachowania używają dostępnych zapytań i realistycznych interakcji,
- co najmniej jeden blok `[D]` diagnozuje efekty/rendery, a `[O]` wymaga pomiaru,
- moduły obejmują dostępność, async UI, error/pending states i decyzje architektoniczne,
- Canary/Experimental są jawnie oddzielone od stabilnego rdzenia 19.2.

## Stan realizacji

Kryterium jest spełnione przez 32 tematy, trzy wieloplikowe moduły i 99 zadań.
Końcowy zakres dodaje testy komponentów, wzorce WAI-ARIA, fixed-size windowing i
`react-window` 2, dynamiczne style oraz elective TanStack Query 5. Track następuje
po TypeScript i nie zawiera starterów ani rozwiązań `.js`/`.jsx`.

Każdy z trzech modułów zwiększa integrację: lokalna architektura stanu, async UI
React 19 z external store, a następnie operacyjny server state z dostępnymi filtrami,
dialogiem i rollbackiem optymistycznej mutacji.

## Źródła bazowe

- React Learn:
  <https://react.dev/learn>
- React 19.2 API reference:
  <https://react.dev/reference/react>
- React form Actions:
  <https://react.dev/reference/react-dom/components/form>
- React Compiler:
  <https://react.dev/learn/react-compiler>
- eslint-plugin-react-hooks:
  <https://react.dev/reference/eslint-plugin-react-hooks>
- React Testing Library:
  <https://testing-library.com/docs/react-testing-library/intro/>
- user-event:
  <https://testing-library.com/docs/user-event/intro/>
- Vitest environments:
  <https://vitest.dev/guide/environment.html>
- WAI-ARIA Authoring Practices:
  <https://www.w3.org/WAI/ARIA/apg/patterns/>
- react-window 2:
  <https://github.com/bvaughn/react-window>
- TanStack Query 5:
  <https://tanstack.com/query/latest/docs/framework/react/overview>
