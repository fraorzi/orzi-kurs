# Effect Events, najnowsze wartości i granice reaktywności

Kod efektu bywa złożony z dwóch części:

- reaktywnego procesu, który musi się ponowić po zmianie określonej wartości,
- zdarzenia wywoływanego przez ten proces, które ma jedynie odczytać najnowsze dane.

`useEffectEvent` rozdziela te role:

```tsx
const onConnected = useEffectEvent(() => {
  if (!muted) {
    notify(theme);
  }
});

useEffect(() => (
  chat.connect(roomId, onConnected)
), [chat, roomId]);
```

Zmiana `roomId` resynchronizuje połączenie. Zmiana `muted` lub `theme` nie łączy
ponownie, ale następne zdarzenie zobaczy ich najnowsze wartości.

## Effect Event nie jest zwykłym callbackiem

Funkcję zwróconą przez `useEffectEvent` można wywołać tylko z efektu albo innego
Effect Eventu w tym samym komponencie. Nie przekazuj jej dzieciom i nie używaj jako
handlera kliknięcia.

Effect Event nie trafia do tablicy zależności. Jego identity celowo nie jest stabilne,
a oficjalny lint pilnuje tego kontraktu.

## Co pozostaje zależnością

Wartość jest reaktywna, jeśli jej zmiana oznacza, że zewnętrzny proces jest już
zsynchronizowany z niewłaściwą konfiguracją. Przykładowo:

- `roomId` wymaga zmiany połączenia,
- `intervalMs` wymaga ponownego ustawienia timera,
- aktualny motyw powiadomienia zwykle nie wymaga ponownego połączenia.

Effect Event nie służy do ukrywania brakujących zależności. Najpierw nazwij proces
zewnętrzny i zdecyduj, które wartości naprawdę definiują jego konfigurację.

## Stale closure

Callback zarejestrowany przez efekt zachowuje snapshot renderu, który utworzył
subskrypcję. Pusta tablica zależności nie sprawia automatycznie, że callback widzi
najnowszy stan. Effect Event pozwala odczytać ostatni zatwierdzony render bez
restartowania subskrypcji.

## Kiedy używać

- Używaj Effect Eventu dla callbacka wywoływanego przez timer, listener lub połączenie.
- Czytaj w nim najnowsze ustawienia, które nie konfigurują samej subskrypcji.
- Pozostaw reaktywne parametry procesu w zwykłych zależnościach efektu.

## Kiedy unikać

- Nie używaj Effect Eventu do obsługi kliknięć i submitów.
- Nie przenoś do niego całej treści efektu tylko po to, by uciszyć lint.
- Nie przekazuj Effect Eventu do innego komponentu lub custom hooka.

## Pułapki

- Dodanie Effect Eventu do zależności jest błędem kontraktu.
- Bez Effect Eventu wybór między stale closure a nadmierną resynchronizacją może
  wyglądać jak fałszywa alternatywa.
- Nie każda najnowsza wartość jest niereaktywna; np. nowy adres serwera zwykle wymaga
  nowego połączenia.
- Effect Event może być wywołany dopiero po commitcie, nie podczas renderu.

## Źródła

- <https://react.dev/reference/react/useEffectEvent>
- <https://react.dev/learn/separating-events-from-effects>
- <https://react.dev/learn/removing-effect-dependencies>
- <https://react.dev/blog/2025/10/01/react-19-2>
