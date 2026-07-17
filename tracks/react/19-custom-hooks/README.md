# Projektowanie custom hooks

Custom hook współdzieli logikę stanową, ale nie sam stan. Dwa wywołania
`usePersistentDraft` tworzą dwie niezależne instancje stanu, tak jak dwa osobne
wywołania `useState`.

Nazwa hooka zaczyna się od `use`, dzięki czemu linter i czytelnik wiedzą, że
funkcja może korzystać z innych Hooków. Zwykła funkcja bez Hooków nie powinna
dostawać prefiksu `use`.

## API opisujące zamiar

Preferuj nazwę celu:

- `useNetworkStatus`,
- `usePersistentDraft`,
- `useChatRoom`.

Unikaj wrapperów udających lifecycle, np. `useMount` lub `useEffectOnce`. Ukrywają
reaktywne zależności i utrudniają lintowi wykrycie błędów. Dobry custom hook
ogranicza możliwe użycia i jasno pokazuje przepływ danych.

## Cleanup i reaktywne argumenty

Kod hooka jest częścią renderowania komponentu i uruchamia się ponownie przy każdym
renderze. Argumenty są reaktywne. Efekt debounce musi anulować poprzedni timer, a
subskrypcja musi zwrócić cleanup.

Lazy initializer `useState` nadaje się do jednorazowego odczytu storage bez
powtarzania go przy każdym renderze.

## Debugowanie

`useDebugValue` dodaje czytelną etykietę w React DevTools. Nie dodawaj go do
każdego prostego hooka. Dla kosztownego formatowania przekaż drugi argument:

```tsx
useDebugValue(status, value => formatStatus(value));
```

Formatter zostanie użyty dopiero podczas inspekcji hooka.

## Kiedy używać

- Gdy kilka komponentów synchronizuje się z tym samym rodzajem zewnętrznego API.
- Gdy ekstrakcja nadaje logice konkretną, czytelną nazwę.
- Gdy testowanie logiki osobno od widoku upraszcza regresje.

## Kiedy unikać

- Nie wyciągaj każdego pojedynczego `useState` tylko dla redukcji kilku linii.
- Funkcja czysto obliczeniowa powinna pozostać zwykłą funkcją.
- Nie ukrywaj brakujących zależności w `useEffectOnce`.

## Pułapki

- Brak cleanupu w debounce uruchamia nieaktualne timery.
- Odczyt storage podczas każdego renderu jest zbędny i może być kosztowny.
- Custom hook nie tworzy automatycznie współdzielonego globalnego stanu.
- Zbyt szeroki hook szybko staje się trudnym do zmiany mini-frameworkiem.

## Źródła

- <https://react.dev/learn/reusing-logic-with-custom-hooks>
- <https://react.dev/reference/react/useDebugValue>
- <https://react.dev/reference/react/useSyncExternalStore>
