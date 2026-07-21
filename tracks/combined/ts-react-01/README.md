# ts+react — generyczny komponent tabeli danych

Projekt łączy generyki TypeScript z dostępnym renderowaniem React. Modeluje
reużywalny prymityw UI: `DataTable<T>`, który działa nad dowolnym typem
wiersza, zachowując bezpieczeństwo typów (kolumny związane z `T`),
semantykę ARIA i stabilną tożsamość wierszy.

## Kontekst

Biblioteka komponentów potrzebuje jednej tabeli do wielu ekranów: użytkownicy,
produkty, zamówienia. Zamiast pisać osobny komponent na każdy typ, generyk
`DataTable<T>` przyjmuje typowane kolumny (`render(row: T)`) i funkcję klucza
(`keyOf(row: T)`). Typy muszą się wiązać (błędna kolumna = błąd kompilacji),
a wynik musi być dostępny (semantyczna tabela, ogłoszony pusty stan).

## Decyzje

- **Generyk `T` zamiast `any`.** `Column<T>` wiąże `render` z typem wiersza —
  odwołanie do nieistniejącego pola nie kompiluje się. `any` straciłby tę
  ochronę.
- **`keyOf` zamiast indeksu tablicy.** Klucz z domenowego identyfikatora
  utrzymuje tożsamość wiersza przy reorderze i filtrowaniu — indeks jako klucz
  psuje stan i animacje Reacta.
- **Semantyczna tabela.** `<th scope="col">` i `<td>` dają poprawne role ARIA
  (`columnheader`, `cell`) — czytnik ekranu rozumie strukturę.
- **Pusty stan jako `role="status"`.** Zamiast pustej tabeli renderujemy
  komunikat ogłaszany asystująco, bo brak danych to informacja, nie brak UI.

## Pułapki

- Indeks tablicy jako `key` łamie tożsamość wiersza — użyj stabilnego `keyOf`.
- `any` zamiast generyka wygląda podobnie, ale znosi inferencję i sprawdzanie
  pól kolumn.
- Pusta tabela bez `role="status"` nie ogłasza pustego stanu użytkownikom
  czytników ekranu.
- Renderowanie komórek poza `<td>`/`<th>` psuje role ARIA i nawigację tabelą.

## Źródła (audyt 2026-07-20)

- [TypeScript: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [React: Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
- [WAI-ARIA: Table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
