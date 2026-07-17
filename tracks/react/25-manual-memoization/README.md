# Ręczna memoizacja po pomiarze

React Compiler ogranicza potrzebę ręcznego `useMemo`, `useCallback` i `memo`.
Ręczne API pozostają jednak użyteczne jako precyzyjny escape hatch, gdy Compiler
nie jest włączony, Profiler wykazał realny koszt albo referencyjna stabilność jest
częścią kontraktu z innym API.

`memo` porównuje każdy prop przez `Object.is`. Jedna funkcja, tablica lub obiekt
tworzony od nowa w rodzicu wystarczy, aby przerwać optymalizację. `useCallback`
zapamiętuje samą funkcję, a `useMemo` wynik obliczenia. Oba mechanizmy są cache'em
wydajnościowym, który React może odrzucić — logika nie może zależeć od niego dla
poprawności.

## Najpierw pomiar

`<Profiler>` raportuje m.in. `actualDuration` bieżącego commitu i szacowany
`baseDuration` całego poddrzewa. W testach deterministyczniej jest liczyć zbędne
commity lub wywołania kosztownej funkcji niż asertywnie porównywać milisekundy na
maszynie CI.

Najpierw sprawdź również prostsze zmiany: lokalizację stanu, kompozycję przez
`children`, mniejsze propsy i usunięcie zbędnego Effectu. Memoizacja nie naprawi
architektury, która przy każdej interakcji zmienia wszystkie dane wejściowe.

## Kiedy używać

- `useMemo`, gdy zmierzone obliczenie nie powinno powtarzać się po niezwiązanej
  aktualizacji albo stabilny obiekt jest kontraktem integracji.
- `useCallback`, gdy stabilna funkcja trafia do rzeczywiście memoizowanego,
  kosztownego potomka albo jest zależnością innego hooka.
- `memo`, gdy komponent często dostaje identyczne propsy i jego render ma koszt.

## Pułapki

- `memo` jest optymalizacją, nie gwarancją pominięcia renderu.
- Brak zależności tworzy stale closure; nadmiarowa zależność unieważnia cache.
- Inline obiekt lub callback może zniszczyć memoizację potomka.
- Custom comparator musi porównać również funkcje; inaczej zamraża stare closure.
- Porównanie głębokie może być droższe niż render.
- W Strict Mode kalkulacja `useMemo` może zostać wywołana dodatkowo w development.

## Źródła

- <https://react.dev/reference/react/Profiler>
- <https://react.dev/reference/react/memo>
- <https://react.dev/reference/react/useMemo>
- <https://react.dev/reference/react/useCallback>
- <https://react.dev/learn/react-compiler/introduction>

