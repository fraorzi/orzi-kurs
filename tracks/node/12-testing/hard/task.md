# Hard - testuj przez port efemeryczny

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Test integracyjny serwera HTTP nie może hardkodować portu. Zaimplementuj
`solve(server, run)`:

- wystartuj przekazany `http.Server` na porcie **0** (system przydziela wolny
  port) i adresie `127.0.0.1`;
- odczytaj przydzielony port z `server.address()` i zbuduj origin
  `http://127.0.0.1:<port>`;
- wykonaj `run(origin)` i zwróć jego wynik;
- zamknij serwer w `finally` - również gdy `run` rzuci; błąd nasłuchu
  (np. zajęty adres) ma odrzucić całość.
