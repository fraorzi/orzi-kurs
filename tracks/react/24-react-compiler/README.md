# React Compiler i stopniowa adopcja

React Compiler 1.x jest stabilnym narzędziem build-time. Analizuje komponenty i
hooki zgodne z Rules of React, a następnie automatycznie memoizuje obliczenia,
funkcje i fragmenty JSX. Główne cele to ograniczenie kaskadowych renderów oraz
powtarzania kosztownych obliczeń podczas aktualizacji.

Compiler nie przyspiesza każdej funkcji w aplikacji i nie współdzieli cache'u
między instancjami komponentu. Nadal trzeba najpierw mierzyć, lokalizować stan i
usuwać niepotrzebną pracę.

## Reguły są kontraktem poprawności

Compiler zakłada czystość renderu, niemutowalne propsy i stan, poprawną kolejność
hooków oraz brak odczytu/zapisu refów podczas renderowania. Gdy wykryje
nieobsługiwany wzorzec, bezpiecznie pomija dany komponent, a pozostała część
aplikacji może nadal zostać zoptymalizowana.

`eslint-plugin-react-hooks` udostępnia diagnostykę Compilera nawet przed jego
włączeniem. Nie trzeba naprawić całej starej aplikacji jednocześnie; liczba
pominiętych komponentów jest sygnałem postępu migracji.

## Stopniowe wdrożenie

Możliwe strategie to wdrożenie katalogami, `compilationMode: "annotation"` z
dyrektywą `"use memo"` albo runtime gating. Dyrektywa `"use no memo"` jest
tymczasowym narzędziem diagnostycznym i awaryjnym opt-outem, a nie trwałym sposobem
ukrywania naruszeń reguł.

Po podejrzeniu regresji najpierw porównaj zachowanie bez kompilacji, sprawdź lint,
usuń zależność poprawności od referencyjnej równości i dopiero po naprawie usuń
`"use no memo"`. React DevTools pokazuje badge skompilowanych komponentów.

## Kiedy używać

- W nowym kodzie zgodnym z Rules of React, aby automatycznie ograniczać pracę
  aktualizacji bez ręcznego rozsypywania memoizacji.
- Stopniowo w istniejącej aplikacji, wraz z testami zachowania i pomiarami.
- Diagnostyki lintera jeszcze przed produkcyjnym włączeniem transformacji.

## Pułapki

- Memoizacja nie może być wymagana do poprawności logiki aplikacji.
- `"use no memo"` izoluje problem, ale nie usuwa jego przyczyny.
- Compiler może pominąć komponent zamiast przerwać build.
- Nie usuwaj mechanicznie istniejącego `useMemo`, `useCallback` i `memo`; zmiana
  może wpłynąć na wynik kompilacji albo kontrakt referencji.
- Plugin Babel musi działać przed innymi transformacjami źródła.
- Optymalizacja w komponencie nie tworzy współdzielonego cache'u domenowego.

## Źródła

- <https://react.dev/learn/react-compiler/introduction>
- <https://react.dev/learn/react-compiler/installation>
- <https://react.dev/learn/react-compiler/incremental-adoption>
- <https://react.dev/learn/react-compiler/debugging>
- <https://react.dev/reference/eslint-plugin-react-hooks>

