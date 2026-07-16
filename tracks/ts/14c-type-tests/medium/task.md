# Medium — testy zatrzymujące poszerzenie generyka

Plik `type-tests.ts` jest gotową specyfikacją. Napraw `src/key-by.ts`, aby:

- klucz wyniku wynikał z `keyOf`,
- wartość mapy zachowywała typ elementu,
- key selector musiał zwracać `PropertyKey`,
- ostatni element o tym samym kluczu wygrywał.

Nie zmieniaj testów typów. Ich zadaniem jest zatrzymać przyszłe poszerzenie API do
`Map<PropertyKey, unknown>`.
