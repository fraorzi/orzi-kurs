# `use`, Suspense i Error Boundary

API `use` odczytuje context albo wynik Promise:

```tsx
const theme = use(ThemeContext);
const user = use(userPromise);
```

Mimo nazwy `use` nie jest zwykłym Hookiem. Można wywołać je warunkowo lub w pętli,
ale nadal tylko podczas renderowania komponentu albo custom hooka.

## Promise jako zasób

Gdy `use` otrzyma oczekującą Promise, komponent zawiesza renderowanie. Najbliższy
`<Suspense>` pokazuje fallback, a po rozwiązaniu Promise React ponawia render.

Promise musi mieć stabilną tożsamość. Tworzenie nowej Promise podczas każdego
renderu powoduje ponowne zawieszanie i ostrzeżenia. W realnym projekcie zasób
pochodzi zwykle z cache frameworka, Server Componentu albo warstwy danych.

## Granice ładowania i błędów

Suspense obsługuje oczekiwanie, nie błąd. Odrzucona Promise przechodzi do
najbliższego Error Boundary. Klasyczny Error Boundary używa:

- `static getDerivedStateFromError` do pokazania fallbacku,
- opcjonalnie `componentDidCatch` do raportowania.

Retry musi utworzyć nowy zasób i zresetować granicę błędu. Samo ponowne wywołanie
funkcji ładowania bez podmiany Promise używanej przez render niczego nie naprawia.

## Kiedy używać

- Dla danych dostarczanych przez środowisko zintegrowane z Suspense.
- Gdy granice ładowania odpowiadają znaczącym fragmentom doświadczenia użytkownika.
- Gdy awaria jednej sekcji nie powinna usuwać całej strony.

## Kiedy unikać

- Nie twórz ręcznie nowej Promise w renderze.
- Nie opakowuj każdego drobnego elementu osobnym fallbackiem.
- Nie używaj `try/catch` wokół `use(promise)` — mechanizm Suspense korzysta z
  wewnętrznego rzucania.

## Pułapki

- Suspense nie wykrywa dowolnego fetcha uruchomionego w efekcie.
- Error Boundary nie łapie zwykłych błędów event handlerów ani async callbacków.
- Zbyt wysoka granica błędu usuwa za dużo działającego UI.
- Retry bez nowej Promise lub reset key pozostawia użytkownika w fallbacku błędu.

## Źródła

- <https://react.dev/reference/react/use>
- <https://react.dev/reference/react/Suspense>
- <https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary>
