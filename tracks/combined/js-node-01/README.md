# CLI z pulą i retry

## Kontekst

CLI importuje katalog plików przez zawodny endpoint HTTP. Bez limitu
współbieżności potrafi otworzyć setki równoległych żądań naraz i zalać
endpoint; bez retry pojedynczy przejściowy błąd sieci (timeout, 503) wywala
cały import od zera, mimo że powtórzenie tego jednego żądania by wystarczyło.
Projekt łączy worker pool (kontrola zasobów) z selektywnym ponawianiem
(odporność na błędy sieciowe) w jednej funkcji.

## Decyzje

- Pool zamiast `Promise.all(items.map(...))` wprost — bez ograniczenia
  równoległości CLI potrafi otworzyć tysiąc gniazd TCP jednocześnie i
  zostać ubanowane przez endpoint albo wyczerpać limity systemowe.
- Wynik indeksowany po oryginalnej pozycji, nie po kolejności zakończenia —
  kolejność wyjścia CLI musi odpowiadać kolejności wejścia niezależnie od
  tego, który plik pobrał się pierwszy.
- Retry działa na poziomie pojedynczego itemu, nie całego poola — jeden
  zawodny plik nie blokuje ani nie unieważnia pozostałych.
- Retry jest selektywny: tylko błędy oznaczone `transient: true` (timeout,
  503, ECONNRESET) są ponawiane; błędy walidacji czy 4xx propagują się od
  razu, bo ponowienie i tak zwróci ten sam wynik.
- Maksymalnie 3 próby łącznie na item — bez górnej granicy retry
  zamieniłby przejściową awarię w potencjalnie nieskończoną pętlę.

## Pułapki

- `Promise.all(items.map(worker))` uruchamia wszystkie zadania od razu —
  parametr `limit`, który nic nie ogranicza, jest najczęstszym fałszywym
  fixem tego zadania.
- Zapisywanie wyników przez `push` zamiast pod oryginalnym indeksem gubi
  kolejność, gdy zadania kończą się w innej kolejności niż zaczęły.
- Ponawianie błędów bez flagi `transient` maskuje realne problemy (błędny
  input, 401) pod pozorem "spróbuj jeszcze raz" i tylko opóźnia porażkę.
- Współdzielony licznik (`cursor++`) jest bezpieczny tylko dlatego, że
  JavaScript wykonuje kod synchronicznie między `await`; w środowisku
  z prawdziwymi wątkami wymagałby jawnej synchronizacji.

## Źródła (audyt 2026-07-20)

- [MDN — Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Node.js — dokumentacja process](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html)
- [AWS — Retries and exponential backoff](https://docs.aws.amazon.com/general/latest/gr/api-retries.html)
