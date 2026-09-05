# Hard - regresja typów klienta RPC

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Napraw `src/client.ts` według gotowego `type-tests.ts`.

`createClient(handlers)` ma zwracać klienta, którego `call`:

- przyjmuje wyłącznie nazwę istniejącej trasy,
- wiąże input z pierwszym parametrem handlera,
- zwraca dokładny wynik handlera,
- nie wprowadza `any`.

Test runtime sprawdza prawdziwe wywołanie handlera. Testy typów sprawdzają również
złe wejście i nieznaną trasę.
