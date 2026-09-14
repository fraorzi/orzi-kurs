# Audyt tracka React

Data audytu: 2026-09-14.

Wersja docelowa repo: React 19.2.4. Audyt objął 99 z 99 zadań. Dla każdego zadania
porównano README tematu, polecenie, kanoniczny `_starter`, hinty, test i wzorzec.
Hash szablonu i wynik przeglądu każdego taskId zapisuje `react.json`.

## Źródła pierwotne

- React Learn: <https://react.dev/learn>
- React API Reference: <https://react.dev/reference/react>
- Props jako snapshoty: <https://react.dev/learn/passing-props-to-a-component>
- Stan pochodny i efekty: <https://react.dev/learn/you-might-not-need-an-effect>
- Effect Events: <https://react.dev/reference/react/useEffectEvent>
- Actions i optimistic UI: <https://react.dev/reference/react/useActionState>,
  <https://react.dev/reference/react/useOptimistic>
- External stores: <https://react.dev/reference/react/useSyncExternalStore>

Dokumentacja Reacta pokazywała podczas audytu wersję 19.3. Materiał pozostaje
przypięty do zależności repo 19.2.4. Sprawdzone API używane w zadaniach są dostępne
w wersji docelowej.

## Wynik

- Usunięto dekoracyjne `readonly` z kanonicznych starterów, wzorców, przykładów
  i fixture'ów. Nie zmieniono `starter.*`, katalogów `src/` ani `progress.json`.
- Poprawiono hinty React 06 easy i React 11 medium oraz składnię payloadu w poleceniu
  React 06 hard.
- Zastąpiono casty custom properties jawnie typowanymi wartościami stylów.
- W module 03 zastąpiono `find` wykonywany dla każdego zgłoszenia indeksem agentów.
- W React 30 hard usunięto tablicę pośrednią i spread do `Math.max`.

Nie ma wyjątków `readonly` w tym tracku. Atrybut DOM `readOnly` nie jest
modyfikatorem TypeScript i pozostaje tam, gdzie opisuje zachowanie kontrolki.
