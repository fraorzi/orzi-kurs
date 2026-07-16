# Testy komponentów dające pewność przy refaktorze

Dobry test opisuje zachowanie widoczne dla użytkownika, nie strukturę implementacji.
Im bardziej sposób użycia testu przypomina sposób użycia aplikacji, tym większą
pewność daje po zmianie komponentów, hooków albo drzewa DOM.

## Priorytet zapytań

Najczęściej zaczynaj od `getByRole(role, { name })`. Rola i nazwa dostępna opisują
to, jak kontrolkę odnajduje użytkownik technologii asystującej. Dla formularzy
dobrym wyborem jest również `getByLabelText`. `getByTestId` pozostaje escape
hatchem, gdy element nie ma sensownej semantyki użytkowej.

- `getBy...` — element ma istnieć teraz; brak lub wiele wyników jest błędem.
- `queryBy...` — element może nie istnieć; używaj głównie do asercji nieobecności.
- `findBy...` — element pojawi się asynchronicznie; zapytanie retry'uje i zwraca
  Promise.

## Interakcje i async UI

`user-event` symuluje pełniejsze interakcje niż pojedynczy `fireEvent`: ustawia
focus, sprawdza widoczność i disabled oraz emituje powiązane zdarzenia. Utwórz
instancję przez `userEvent.setup()` — w tym repo robi to `renderWithUser` — i
awaituj każdą interakcję.

Po akcji sprawdzaj ważne stany pośrednie, np. pending i disabled, a następnie
końcowy sukces lub błąd. Użyj `findBy` dla pojawienia się elementu i `waitFor`
głównie wtedy, gdy oczekujesz zmiany callbacku lub wielu powiązanych asercji.

## Kiedy używać

- Do publicznych przepływów użytkownika i regresji dostępności komponentu.
- Dla asynchronicznych formularzy, wyszukiwania, retry i optimistic UI.
- W wariantach layoutu, które powinny zachować ten sam kontrakt zachowania.

## Pułapki

- `container.querySelector`, klasy CSS i indeksy dzieci wiążą test ze strukturą.
- Snapshot dużego drzewa łatwo zaakceptować bez zrozumienia regresji.
- `getByText` dla przycisku pomija rolę i może znaleźć nieinteraktywny tekst.
- Brak `await` przed `user.click` lub `user.type` tworzy wyścigi.
- Arbitralny timeout ukrywa niewłaściwy model asynchroniczności.
- Testowanie state/hooka zamiast widocznego skutku utrudnia bezpieczny refaktor.

## Źródła

- <https://testing-library.com/docs/guiding-principles/>
- <https://testing-library.com/docs/queries/about/>
- <https://testing-library.com/docs/queries/byrole/>
- <https://testing-library.com/docs/user-event/intro/>
- <https://testing-library.com/docs/dom-testing-library/api-async/>
