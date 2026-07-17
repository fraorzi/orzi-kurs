# Formularze i Actions w React 19

React 19 pozwala przekazać funkcję bezpośrednio do `action` formularza:

```tsx
async function saveAction(formData: FormData) {
  await saveProfile(String(formData.get("displayName")));
}

<form action={saveAction}>...</form>
```

React wywołuje taką funkcję w Transition, przekazuje jej `FormData`, śledzi stan
wysyłania i po udanym zakończeniu resetuje niekontrolowane pola formularza. Nie
trzeba wywoływać `preventDefault`.

## Stan wyniku przez `useActionState`

`useActionState` łączy wynik operacji, funkcję Action i stan pending:

```tsx
const [state, submitAction, isPending] = useActionState(
  async (previousState, formData: FormData) => {
    // walidacja, zapis i nowy stan
  },
  initialState,
);
```

Pierwszym argumentem Action jest poprzedni stan. Kolejne wywołania są wykonywane
sekwencyjnie, więc wynik pierwszej operacji staje się wejściem następnej. To ważne
dla operacji zależnych, np. aktualizacji licznika lub koszyka.

## Błędy oczekiwane i nieoczekiwane

Błędy walidacji i przewidywalne odmowy backendu zwracaj jako część jawnego stanu
formularza. Nieoczekiwane wyjątki mogą zostać rzucone do najbliższego Error
Boundary. Nie używaj jednego ogólnego `catch` do zamiany każdego błędu programu na
komunikat walidacyjny.

## Kiedy używać

- Gdy formularz uruchamia operację async i potrzebuje stanu jej wyniku.
- Gdy chcesz korzystać z natywnego `FormData`, resetu formularza i integracji z
  `useFormStatus` lub `useOptimistic`.
- Gdy kolejne akcje muszą otrzymywać wynik poprzedniej.

## Kiedy unikać

- Prosty filtr działający wyłącznie lokalnie nie potrzebuje Action.
- Nie przenoś całego stanu edycji pól do `useActionState`, jeśli kontrolowany input
  nadal jest najczytelniejszym rozwiązaniem.
- Nie wywołuj dispatchera `useActionState` poza Action lub `startTransition`.

## Pułapki

- `FormData.get` zwraca `FormDataEntryValue | null`, więc granica wymaga parsowania.
- Funkcyjny `action` zawsze używa semantyki POST, niezależnie od `method`.
- Zwrócenie stanu błędu walidacji nadal kończy Action; świadomie zdecyduj, które
  wartości formularza mają pozostać kontrolowane.
- Zamknięcie nad nieaktualnym stanem omija sekwencyjny kontrakt `previousState`.

## Źródła

- <https://react.dev/reference/react-dom/components/form>
- <https://react.dev/reference/react/useActionState>
- <https://react.dev/blog/2024/12/05/react-19>
