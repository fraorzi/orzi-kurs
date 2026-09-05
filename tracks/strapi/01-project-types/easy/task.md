# Easy - rozpoznaj UID content type

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Rejestr serwisów w kodzie backendowym musi odróżnić własny content type od
typu pluginu czy panelu admina, zanim spróbuje go zarejestrować albo
wygenerować dla niego trasę. Zaimplementuj `solve(uid)`:

- akceptuj wyłącznie UID przestrzeni `api::<collection>.<contentType>`,
  gdzie oba segmenty są kebab-case (małe litery, cyfry, myślniki, zaczynają
  się literą);
- zwróć krotkę `[collection, contentType]`;
- UID spoza przestrzeni `api` (`plugin::...`, `admin::...`) ma rzucić błąd
  wspominający `UID` - to sygnał, że wywołujący próbuje zarządzać cudzym
  content typem;
- UID o złej strukturze (brak kropki, wielka litera w segmencie, brakujący
  drugi segment) ma rzucić ten sam typ błędu.
