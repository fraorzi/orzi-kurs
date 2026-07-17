# Stan jako snapshot, batching i aktualizacje funkcyjne

Lokalny stan pozwala komponentowi pamiętać dane między renderami. `useState`
zwraca wartość z bieżącego renderu oraz funkcję zlecającą następny render:

```tsx
const [isOpen, setIsOpen] = useState(false);

function handleClick() {
  setIsOpen(true);
}
```

Setter nie zmienia zmiennej `isOpen` w już działającym handlerze. Każdy render
dostaje własny snapshot propsów i stanu, a utworzone w nim handlery „widzą” właśnie
ten snapshot.

## Batching

React grupuje aktualizacje stanu z jednego zdarzenia, zanim odświeży UI. Dlatego
trzy wywołania poniżej nie oznaczają trzech kolejnych wartości:

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Każde z nich korzysta z tego samego `count`. Jeśli następna wartość zależy od
poprzedniej, przekaż updater:

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
setCount((current) => current + 1);
```

React umieszcza funkcje w kolejce i przekazuje każdej wynik poprzedniej.

## Granice asynchroniczne

Snapshot ma znaczenie także po `await`, timeoutach i odpowiedziach sieciowych:

```tsx
async function handleSave() {
  await save();
  setCompleted((current) => current + 1);
}
```

Kilka operacji może wystartować z tym samym snapshotem. Aktualizacja funkcyjna
nie rozwiązuje wszystkich problemów współbieżności, ale zapobiega gubieniu
niezależnych zmian opartych na ostatnim stanie.

## Stan jest tylko do odczytu

Nie przypisuj bezpośrednio do zmiennej stanu i nie mutuj przechowywanych obiektów.
Zmianę zgłasza się setterem. Dla obiektów i tablic trzeba dodatkowo utworzyć nową
wartość — temu poświęcony jest następny temat.

## Kiedy używać

- Używaj lokalnego stanu dla danych zmieniających się przez interakcję i należących
  do konkretnej instancji komponentu.
- Używaj updatera, gdy nowa wartość wynika z poprzedniej albo aktualizacja może
  nastąpić po granicy asynchronicznej.
- Nadaj handlerom nazwy opisujące intencję, gdy zawierają więcej niż prostą operację.

## Kiedy unikać

- Nie zapisuj w stanie wartości, którą można wyliczyć z propsów lub innego stanu.
- Nie wywołuj setterów podczas renderowania.
- Nie oczekuj, że odczyt zmiennej zaraz po setterze zwróci wartość następnego renderu.

## Pułapki

- `setCount(count + 1)` użyte kilka razy w jednym handlerze korzysta z tego samego
  snapshotu.
- Handler asynchroniczny może zakończyć się po wielu późniejszych renderach.
- Stan jest prywatny dla pozycji komponentu w drzewie, a nie dla samej funkcji.
- Updater powinien być czysty; React może wywołać go ponownie w trybie deweloperskim.

## Źródła

- <https://react.dev/learn/state-a-components-memory>
- <https://react.dev/learn/state-as-a-snapshot>
- <https://react.dev/learn/queueing-a-series-of-state-updates>
