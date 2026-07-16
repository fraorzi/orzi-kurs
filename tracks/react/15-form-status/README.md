# Status formularza przez `useFormStatus`

`useFormStatus` udostępnia status ostatniego wysłania nadrzędnego formularza:

```tsx
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  return <button disabled={pending}>Zapisz</button>;
}

<form action={saveAction}>
  <SubmitButton />
</form>
```

Hook działa kontekstowo. Komponent musi być potomkiem formularza, którego status
czyta. Wywołanie `useFormStatus` w tym samym komponencie, który dopiero zwraca
`<form>`, nie śledzi tego formularza.

## Co zawiera status

- `pending` informuje, że nadrzędny formularz wykonuje Action.
- `data` udostępnia wysyłane `FormData` podczas operacji.
- `method` opisuje metodę formularza.
- `action` wskazuje funkcję Action nadrzędnego formularza.

Dzięki temu element systemu designu może obsługiwać pending bez przekazywania flag
przez wiele poziomów propsów.

## Granica formularza

Każdy formularz ma własny status. W panelu z równoległymi operacjami wysłanie
formularza eksportu nie powinno automatycznie blokować formularza archiwizacji.
Umieszczaj komponent statusu pod właściwym `<form>`, a nie nad całą stroną.

## Kiedy używać

- Dla przycisków i komunikatów zależnych od Action nadrzędnego formularza.
- W reużywalnych komponentach formularzy i systemach designu.
- Gdy chcesz pokazać dane aktualnie wysyłane bez duplikowania ich w stanie.

## Kiedy unikać

- Poza formularzem `pending` zawsze będzie `false`.
- Nie zastępuje stanu wyniku, walidacji ani komunikatu błędu.
- Nie używaj jednego globalnego pending do niezależnych operacji.

## Pułapki

- Hook nie śledzi formularza renderowanego w tym samym komponencie.
- `data` jest `null`, gdy nie trwa wysyłanie.
- Wyłączanie wszystkich pól podczas pending może być złym UX dla operacji
  działających niezależnie.
- Dostępny tekst przycisku powinien jasno informować o trwającej operacji.

## Źródła

- <https://react.dev/reference/react-dom/hooks/useFormStatus>
- <https://react.dev/reference/react-dom/components/form>
- <https://react.dev/blog/2024/12/05/react-19>
