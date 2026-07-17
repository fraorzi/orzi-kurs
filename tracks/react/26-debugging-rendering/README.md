# Debugowanie renderów, zależności i cleanupu

Problemy Reacta często nie wynikają z pojedynczego API, lecz z rozjazdu między
cyklem życia procesu zewnętrznego a cyklem renderowania. Objawy to zdublowane
subskrypcje, stale closure, zapis do starego zasobu, reset lokalnego stanu albo
kosztowne poddrzewo commitujące przy każdej literze.

## Procedura diagnostyczna

1. Odtwórz problem testem zachowania: zmień prop, źródło albo szybko wykonaj kilka
   interakcji.
2. Sprawdź lint Rules of Hooks i `exhaustive-deps`; nie wyciszaj ostrzeżenia bez
   modelu procesu.
3. Użyj React DevTools albo małej granicy `<Profiler>` wokół podejrzanego
   poddrzewa, nie całej aplikacji.
4. Ustal, która aktualizacja stanu jest przyczyną commitu i czy stan ma właściwego
   właściciela.
5. Napraw poprawność setup/cleanup oraz zależności przed optymalizacją.
6. Powtórz scenariusz i porównaj commity lub wywołania, nie tylko wygląd końcowy.

Każdy Effect opisuje osobny proces synchronizacji. Przy zmianie zależności React
najpierw uruchamia cleanup starego procesu, a potem setup nowego. Cleanup powinien
być symetryczny: unsubscribe do subscribe, remove do add, disconnect do connect.

## Kiedy używać

- Gdy zdarzenie jest obsługiwane wielokrotnie albo po odłączeniu widoku.
- Gdy Effect korzysta ze starego propsa lub nie reaguje na zmianę zasobu.
- Gdy drogi fragment renderuje się po niezwiązanej lokalnej interakcji.
- Przy regresji wydajności po zmianie właściciela stanu lub kompozycji drzewa.

## Pułapki

- Pusty array zależności nie znaczy „uruchom raz”, jeśli kod czyta reaktywne dane.
- Wyłączenie `exhaustive-deps` utrwala stale closure.
- Strict Mode celowo ujawnia niesymetryczny setup/cleanup dodatkowym cyklem.
- Logi renderu w development mogą być mylące; mierz commity właściwej granicy.
- `Profiler` dodaje narzut i nie jest domyślnie aktywny w produkcyjnym buildzie.
- Memoizacja przed naprawą właściciela stanu często tylko maskuje przyczynę.

## Źródła

- <https://react.dev/learn/lifecycle-of-reactive-effects>
- <https://react.dev/learn/removing-effect-dependencies>
- <https://react.dev/reference/react/Profiler>
- <https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps>
- <https://react.dev/learn/react-developer-tools>

