# Stan pochodny i logika bez zbędnych efektów

Stan powinien przechowywać minimalny zestaw informacji, których nie da się odtworzyć
z bieżących propsów i innego stanu. Jeśli wartość można policzyć podczas renderu,
nie zapisuj jej osobno:

```tsx
const [query, setQuery] = useState("");
const visibleProducts = products.filter((product) => (
  product.name.toLowerCase().includes(query.toLowerCase())
));
```

Każdy render automatycznie użyje aktualnych `products` i `query`. Nie ma drugiego
źródła prawdy, które mogłoby pozostać niezsynchronizowane.

## Nie kopiuj propsów do stanu

`useState(props.value)` używa propsa tylko podczas pierwszego renderu. Późniejsza
zmiana propsa nie resetuje stanu. Taki zapis jest poprawny wyłącznie wtedy, gdy
świadomie chcesz potraktować wartość jako jednorazową wartość początkową.

Do zaznaczenia elementu zwykle przechowuj jego ID, a sam element znajduj w aktualnej
liście. Do resetu całej podgałęzi użyj świadomie zmienionego `key`.

## Efekt nie służy do transformowania danych

Efekt, który filtruje propsy i zapisuje wynik do stanu, powoduje dodatkowy render:
najpierw UI renderuje starą wartość, potem efekt ją synchronizuje i uruchamia kolejny
render. Ta synchronizacja jest zbędna, bo transformację można wykonać od razu.

Kosztowne obliczenia są osobnym problemem wydajnościowym. Najpierw zachowaj poprawny,
czysty render; memoizację dodawaj dopiero po pomiarze.

## Zdarzenia pozostają w handlerach

Jeśli kod ma wykonać się dlatego, że użytkownik kliknął `Kup` albo wysłał formularz,
umieść go w odpowiednim handlerze. Efekt widzi wynik renderu, ale traci informację,
które konkretne zdarzenie było przyczyną.

Efekty są potrzebne do synchronizacji z systemami zewnętrznymi, takimi jak połączenie
sieciowe, widget spoza Reacta czy subskrypcja przeglądarki. Ten kontrakt rozwija
następny blok.

## Kiedy używać

- Wyliczaj sumy, filtry, flagi i wybrane rekordy bezpośrednio podczas renderu.
- Przechowuj w stanie wyłącznie wejścia użytkownika i informacje, których nie da się
  odtworzyć.
- Wykonuj operacje wynikające z kliknięcia lub submitu w handlerze tego zdarzenia.

## Kiedy unikać

- Nie synchronizuj jednego stanu z drugim efektem.
- Nie zapisuj całego obiektu wybranego rekordu, jeśli wystarczy stabilne ID.
- Nie dodawaj `useMemo` tylko po to, by uniknąć prostego `filter` lub `reduce`.

## Pułapki

- Wartość początkowa `useState` nie aktualizuje się wraz z propsem.
- Zduplikowane dane mogą być poprawne przez wiele renderów, zanim ujawnią błąd.
- Efekt reagujący na flagę submitu może uruchomić operację ponownie po zmianie
  niezwiązanej zależności albo zgubić kolejne identyczne zdarzenie.
- Usunięcie zbędnego stanu często usuwa również cały efekt i klasę race condition.

## Źródła

- <https://react.dev/learn/choosing-the-state-structure>
- <https://react.dev/learn/you-might-not-need-an-effect>
- <https://react.dev/learn/responding-to-events>
