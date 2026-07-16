# Responsywne wyszukiwanie podczas asynchronicznej akcji

Zaimplementuj `CustomerSearch` korzystający z `useTransition`.

- Pole `Szukaj klientów` ma aktualizować się natychmiast, również podczas requestu.
- Kliknięcie `Szukaj` wywołuje przekazane `searchCustomers` z aktualnym zapytaniem.
- Do czasu zakończenia akcji pokaż status `Wyszukiwanie…` i zachowaj stare wyniki.
- Po rozwiązaniu Promise pokaż nowe wyniki jako listę.
- Aktualizację wyników po `await` oznacz jako Transition.

Nie implementuj własnego stanu `loading`. Źródłem statusu ma być `isPending`.

