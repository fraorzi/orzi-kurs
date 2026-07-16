# JSX, warunki, listy, keys i identity

JSX jest składnią opisującą drzewo elementów. Wyrażenia JavaScript trafiają do
klamerek, a warunki i listy budujesz zwykłymi konstrukcjami języka.

```tsx
function Inbox({ unread }: { readonly unread: number }) {
  return (
    <section>
      <h2>Skrzynka</h2>
      {unread === 0 ? <p>Brak nowych wiadomości</p> : <p>Nowe: {unread}</p>}
    </section>
  );
}
```

Komponent może zwrócić `null`, jeśli w danym stanie nie ma nic do pokazania.
Operator `&&` jest wygodny dla pojedynczej gałęzi, ale pamiętaj, że `{0 && <p />}`
wyrenderuje `0`. Dla liczb użyj jawnego warunku `count > 0`.

## Listy i `key`

Listę najczęściej tworzysz przez `map`:

```tsx
<ul>
  {tasks.map((task) => (
    <li key={task.id}>{task.title}</li>
  ))}
</ul>
```

`key` nie jest zwykłym propsem. React używa go razem z pozycją i typem elementu,
aby zdecydować, czy to ten sam komponent/element między renderami.

Dobry key:

- jest stabilny w czasie,
- jest unikalny wśród rodzeństwa,
- pochodzi z danych.

Indeks tablicy jest bezpieczny tylko dla naprawdę statycznej listy, która nigdy
nie jest sortowana, filtrowana ani uzupełniana. W edytowalnej liście indeks może
przypisać stan lub DOM inputa do innego rekordu po zmianie kolejności.

## Identity i reset stanu

Domyślnie element tego samego typu w tej samej pozycji zachowuje identity. Zmiana
`key` mówi Reactowi: „to inna instancja — usuń poprzednią i utwórz nową”.

```tsx
<Editor key={selectedUser.id} user={selectedUser} />
```

To przydatny, jawny reset formularza przy zmianie edytowanej encji. Nie dodawaj
efektu kopiującego propsy do stanu tylko po to, by taki reset osiągnąć.

## Fragmenty

Fragment `<>...</>` grupuje kilka elementów bez dodatkowego DOM. Jeśli fragment
w liście potrzebuje `key`, użyj jawnego `<Fragment key={id}>`.

## Kiedy używać

- Używaj warunków do reprezentowania rzeczywistych stanów widoku.
- Renderuj kolekcje przez stabilne identyfikatory domenowe.
- Zmieniaj `key`, gdy chcesz świadomie zresetować lokalny stan całej podgałęzi.

## Kiedy unikać

- Nie generuj key przez `Math.random()` ani w czasie renderu.
- Nie używaj indeksu, jeśli elementy mogą zmienić pozycję lub zniknąć.
- Nie zmieniaj `key` przy każdym renderze — niszczy to stan, focus i pracę DOM.

## Pułapki

- `key` nie trafia do komponentu jako `props.key`; potrzebny identyfikator przekaż
  osobnym propsem.
- Brak key daje warning, ale zły key może nie dać warningu i nadal powodować bug.
- Warunek `items.length && <List />` wyświetla `0` dla pustej listy.
- Zagnieżdżone ternary szybko stają się nieczytelne; wyprowadź nazwany fragment UI.

## Źródła

- <https://react.dev/learn/writing-markup-with-jsx>
- <https://react.dev/learn/conditional-rendering>
- <https://react.dev/learn/rendering-lists>
- <https://react.dev/learn/preserving-and-resetting-state>
