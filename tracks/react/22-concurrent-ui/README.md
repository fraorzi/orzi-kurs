# Responsywny interfejs: Transition, wartości odroczone i Activity

React rozróżnia aktualizacje pilne, takie jak wpisywanie do pola, od pracy, która
może zostać wykonana w tle. To nie jest sposób na przyspieszenie wolnego kodu.
To mechanizm ustalania priorytetu oraz zachowania poprzedniego, użytecznego UI,
gdy nowy widok nie jest jeszcze gotowy.

## `useTransition`

`useTransition` oznacza aktualizację jako nieblokującą i udostępnia `isPending`.
Pole kontrolowane powinno nadal aktualizować własny stan natychmiast. Dopiero
wynik kosztownej albo asynchronicznej operacji trafia do Transition.

Po `await` aktualizacja stanu nadal wymaga obecnie osobnego `startTransition`.
W przeciwnym razie React nie oznaczy tej konkretnej aktualizacji jako pracy w
tle. Transition może zostać przerwany przez pilniejszą interakcję.

## `useDeferredValue`

`useDeferredValue` pozwala części drzewa przez chwilę używać poprzedniej wartości.
Gdy render dla nowej wartości zawiesi się, React zachowuje stare wyniki zamiast
pokazywać fallback. Stan `value !== deferredValue` pozwala zakomunikować, że
zawartość jest chwilowo nieaktualna.

Hook nie dodaje stałego opóźnienia i nie jest debounce'em. Request może nadal
powstać dla każdego znaku; odroczone jest renderowanie wyniku, nie pobieranie.

## `<Activity>`

`<Activity mode="hidden">` ukrywa fizyczny DOM przez `display: none`, zachowuje
stan potomków i jednocześnie sprząta ich Effecty. Po powrocie do `visible` stan
jest dostępny, a Effecty są tworzone ponownie. Przydaje się to w panelach i
zakładkach, do których użytkownik często wraca.

## Kiedy używać

- Transition, gdy wynik nawigacji, filtra lub zapisu może pojawić się później,
  ale bieżące kontrolki muszą pozostać responsywne.
- `useDeferredValue`, gdy kosztowny albo zawieszający się fragment może chwilowo
  wyświetlać poprzedni wynik.
- Activity, gdy ukryty fragment ma zachować lokalny stan, lecz nie powinien
  utrzymywać aktywnych subskrypcji.

## Pułapki

- Aktualizacja kontrolująca input nie może być Transition.
- `isPending` nie zastępuje obsługi błędu operacji asynchronicznej.
- `useDeferredValue` nie ogranicza requestów i nie przyspiesza renderowania.
- Nowy obiekt tworzony w każdym renderze jest złą wartością do odraczania.
- Activity sprząta Effecty, ale fizyczne side effecty elementów `video`, `audio`
  lub `iframe` mogą wymagać jawnego zatrzymania.
- Pobieranie uruchomione dopiero w Effect nie jest źródłem danych obsługiwanym
  przez Suspense i nie daje Activity informacji o ładowaniu.

## Źródła

- <https://react.dev/reference/react/useTransition>
- <https://react.dev/reference/react/useDeferredValue>
- <https://react.dev/reference/react/Activity>
- <https://react.dev/reference/react/Suspense>

