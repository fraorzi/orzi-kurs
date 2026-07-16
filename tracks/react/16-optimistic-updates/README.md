# Bezpieczne optimistic updates przez `useOptimistic`

`useOptimistic` pokazuje tymczasowy stan na czas Action:

```tsx
const [optimisticItems, addOptimisticItem] = useOptimistic(
  items,
  (currentItems, newItem) => [
    ...currentItems,
    { ...newItem, pending: true },
  ],
);
```

Setter optimistic state musi zostać wywołany wewnątrz Action — np. funkcji
`form action` albo `startTransition`. Po zakończeniu Action interfejs wraca do
wartości bazowej przekazanej jako pierwszy argument.

## Stan bazowy decyduje o wyniku

Optimistic state jest tymczasową projekcją. Po sukcesie zaktualizuj stan bazowy
danymi potwierdzonymi przez serwer. Po błędzie pozostaw bazę bez zmian, a React
automatycznie wycofa projekcję.

Jeśli serwer zwróci inną liczbę obserwujących lub znormalizowany tekst, UI powinno
ostatecznie pokazać wynik serwera, nie założenie klienta.

## Reducer i rebase

Reducer optimistic update jest szczególnie ważny dla list i danych, które mogą
zmienić się z innego źródła podczas oczekiwania. React może ponownie zastosować
pending update do świeższej wartości bazowej:

```tsx
const [optimisticComments, addComment] = useOptimistic(
  comments,
  (current, draft) => [...current, { ...draft, pending: true }],
);
```

Przekazanie całej wcześniej wyliczonej tablicy łatwo gubi komentarz dostarczony
w międzyczasie przez WebSocket lub refetch.

## Kiedy używać

- Gdy operacja zwykle kończy się sukcesem, a natychmiastowa odpowiedź poprawia UX.
- Dla polubień, obserwowania, dodawania lub usuwania elementów.
- Gdy masz jednoznaczną wartość bazową i strategię błędu.

## Kiedy unikać

- Dla operacji o wysokim ryzyku lub nieodwracalnych, np. finalnej płatności.
- Gdy nie potrafisz wiarygodnie odtworzyć stanu po błędzie.
- Gdy tymczasowy sukces mógłby wprowadzić użytkownika w poważny błąd.

## Pułapki

- Setter wywołany poza Action wyświetli ostrzeżenie i szybko wycofa zmianę.
- Aktualizacja tylko optimistic state bez późniejszej zmiany bazy znika po Action.
- Zamknięcie nad starą tablicą może zgubić nowsze dane.
- Błąd powinien wycofać UI i dać zrozumiały komunikat lub możliwość retry.

## Źródła

- <https://react.dev/reference/react/useOptimistic>
- <https://react.dev/reference/react/useTransition>
- <https://react.dev/reference/react-dom/components/form>
