# Efekty jako synchronizacja z systemem zewnętrznym

`useEffect` służy do utrzymywania komponentu w zgodzie z systemem, którego React
nie kontroluje: API przeglądarki, połączeniem, subskrypcją lub widgetem zewnętrznym.

```tsx
useEffect(() => {
  const disconnect = chat.connect(roomId);
  return disconnect;
}, [chat, roomId]);
```

Funkcja efektu opisuje rozpoczęcie synchronizacji. Zwrócony cleanup opisuje jej
zatrzymanie.

## Cykl setup i cleanup

Po zmianie zależności React:

1. uruchamia cleanup poprzedniego efektu ze starymi wartościami,
2. uruchamia setup nowego efektu z wartościami bieżącego renderu.

Cleanup działa także przy usunięciu komponentu. W trybie deweloperskim React może
wykonać dodatkowy cykl setup → cleanup → setup, aby ujawnić brakujące sprzątanie.
Użytkownik nie powinien odczuć różnicy między jednym a wieloma poprawnymi cyklami.

## Zależności wynikają z kodu

Każdy reaktywny prop, stan oraz funkcja lub obiekt zadeklarowany w komponencie,
którego efekt używa, należy do zależności. Nie wybieraj tablicy zależności według
tego, kiedy chcesz uruchamiać efekt. Zmień kod tak, aby efekt zależał dokładnie od
procesu, który synchronizuje.

Pusta tablica oznacza, że efekt nie czyta żadnej zmiennej reaktywnej. Pominięcie
tablicy uruchamia efekt po każdym commitcie.

## Jeden proces na efekt

Jeśli po zmianie jednej zależności trzeba ponowić tylko część synchronizacji,
prawdopodobnie jeden efekt obsługuje kilka niezależnych procesów:

```tsx
useEffect(() => chat.connect(roomId), [chat, roomId]);
useEffect(() => activity.start(), [activity]);
```

Rozdzielenie nie wynika z liczby linii, ale z odrębnego cyklu życia.

## Kiedy używać

- Synchronizuj API przeglądarki, subskrypcję, timer lub bibliotekę spoza Reacta.
- Zwracaj cleanup, jeśli setup tworzy zasób, listener albo aktywne połączenie.
- Dziel efekty według niezależnych procesów synchronizacji.

## Kiedy unikać

- Nie używaj efektu do wyliczania JSX ani synchronizowania stanu pochodnego.
- Nie obsługuj konkretnego kliknięcia lub submitu przez flagę i efekt.
- Nie wyciszaj `exhaustive-deps`; usuń przyczynę niepoprawnej zależności.

## Pułapki

- Brak cleanupu może pozostawić wiele aktywnych listenerów lub połączeń.
- Obiekt tworzony w renderze ma nową referencję i może ponawiać efekt bez potrzeby.
- Cleanup używa wartości z renderu, który utworzył dany efekt, nie najnowszych propsów.
- Dwa niezależne procesy w jednym efekcie wzajemnie wymuszają resynchronizację.

## Źródła

- <https://react.dev/reference/react/useEffect>
- <https://react.dev/learn/synchronizing-with-effects>
- <https://react.dev/learn/lifecycle-of-reactive-effects>
- <https://react.dev/learn/removing-effect-dependencies>
