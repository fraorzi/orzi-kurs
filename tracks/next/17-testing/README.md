# Strategia testów Next.js

Nie każda część App Routera wymaga tej samej warstwy testów. Czyste funkcje,
synchroniczne Server Components i Client Components można szybko sprawdzać w
Vitest. Route Handlers warto wywoływać przez prawdziwe `Request`/`Response`, aby
testować kontrakt HTTP zamiast prywatnych helperów.

Vitest nie obsługuje obecnie asynchronicznych Server Components. Ich integrację z
App Routerem, streaming, hydratację i nawigację sprawdzaj E2E w uruchomionej
aplikacji. E2E powinno opierać się na rolach, nazwach i skutkach widocznych dla
użytkownika, nie na klasach CSS ani strukturze RSC payload.

Najlepszy zestaw nie maksymalizuje liczby testów. Dużo szybkich testów domeny,
kilka integracyjnych kontraktów HTTP i mały zestaw krytycznych journeys daje
krótszy feedback oraz mniej fałszywych alarmów.

## Kiedy używać

- Unit: parser, policy, cache key, sync Server/Client Component.
- Integration: Route Handler z `Request`, DAL z testową bazą, Action z repozytorium.
- E2E: async Server Component, routing, streaming, cookies, auth i krytyczny checkout.
- Oficjalnych helperów Next do matchera, redirectu i rewrite'u Proxy.

## Kiedy unikać

- Snapshotu całego dashboardu jako głównego dowodu zachowania.
- Mockowania `fetch` wszędzie zamiast wstrzyknięcia adaptera domenowego.
- Testowania prywatnych nagłówków RSC jako kontraktu produktu.
- E2E dla każdej walidacji, którą szybciej pokrywa test Action.

## Pułapki

- Renderowanie async Server Component w Vitest mimo ograniczenia narzędzia.
- Test przechodzący tylko dlatego, że powtarza implementację.
- Selektory `.button-3 > span` łamiące się po refaktorze stylu.
- Brak testów błędu, anulowania, authz i retry.
- Niestabilne oczekiwanie przez `sleep` zamiast auto-wait i obserwowalnego skutku.

## Źródła

- <https://nextjs.org/docs/app/guides/testing/vitest>
- <https://nextjs.org/docs/app/guides/testing/playwright>
- <https://nextjs.org/docs/app/api-reference/file-conventions/proxy#unit-testing-experimental>
- <https://testing-library.com/docs/guiding-principles>
