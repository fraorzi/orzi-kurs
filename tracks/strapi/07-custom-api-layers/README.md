# Custom routes, controllers i services

Gdy standardowy CRUD nie wystarcza (workflow publikacji, agregacja kilku
content types, walidacja specyficzna dla domeny), Strapi 5 pozwala dodać
własną **trasę**, **kontroler** i **serwis** — trzy warstwy o różnej
odpowiedzialności. Trasa to deklaratywny opis (`method`, `path`, `handler`,
`config.policies`, `config.auth`) — żadnej logiki, tylko routing i bramka
uprawnień. Kontroler ma być **cienki**: odczytuje `ctx`, woła serwis,
sanitizuje wynik, przypisuje do `ctx.body` — bez reguł biznesowych. Serwis
niesie logikę domenową i nie zna `ctx` w ogóle, co czyni go testowalnym w
izolacji, bez uruchamiania frameworka.

Kluczowa konsekwencja tego podziału: Document Service zwraca dane
**niesanitizowane** — pola oznaczone jako `private` czy hasła są w wyniku
`service()`, dopóki własny kontroler nie przepuści ich przez
`sanitize` (mechanizm Content API, ten sam co przy standardowym CRUD).
Pominięcie tego kroku w custom endpoincie to najłatwiejszy sposób na
wyciek danych, których standardowy REST API nigdy by nie ujawnił.

Logika w serwisie, nie w kontrolerze, ma jeszcze jeden powód: transakcje i
niezmienniki (unikalność sluga, blokada edycji opublikowanej treści) trzeba
przetestować bez `ctx` i bez HTTP — serwis przyjmuje jawne argumenty i
zależności (repozytorium, inne serwisy), więc test wywołuje go
bezpośrednio, tak jak zrobi to kontroler w produkcji.

## Kiedy używać

- Endpoint spoza standardowego CRUD (akcja `publish`, agregacja, raport) —
  własna trasa z jawną `policy` i `auth`.
- Kontroler jako cienka warstwa: parsowanie `ctx`, wywołanie serwisu,
  sanitization wyniku — nic więcej.
- Serwis jako miejsce na niezmienniki domenowe (unikalność, przejścia
  stanu) niezależny od `ctx`, testowalny wstrzykniętymi zależnościami.

## Kiedy unikać

- Nie pisz logiki domenowej bezpośrednio w kontrolerze — utrudnia to testy
  jednostkowe (trzeba mockować cały `ctx`) i transakcje (dwa wywołania
  serwisu bez wspólnej granicy).
- Nie zwracaj wyniku Document Service z custom kontrolera bez
  `sanitize` — nawet gdy wygląda na "wewnętrzny" endpoint.
- Nie projektuj serwisu przyjmującego `ctx` jako argument — to sprzęga go
  z warstwą HTTP i uniemożliwia test bez frameworka.

## Pułapki

- Kontroler, który sam sanitizuje przez ręczne `delete result.secret`,
  zamiast użyć mechanizmu Content API, zapomni o polu dodanym później do
  schematu — sanitization ma być deklaratywna, nie ręczna.
- Serwis, który sprawdza unikalność sluga bez wykluczenia edytowanego
  dokumentu (`exceptId`), zawsze zgłosi konflikt przy zapisie tej samej
  treści bez zmiany sluga.
- Trasa bez `config.policies` jest dostępna dla każdej roli, która ma
  ogólne uprawnienie do akcji — policy to dodatkowa bramka, nie substytut
  RBAC z tematu 6.
- Walidacja i sprawdzenie konfliktu **przed** zapisem, nie po — serwis, który
  najpierw pisze, a potem sprawdza, zostawia niespójny stan przy błędzie.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Backend customization — routes](https://docs.strapi.io/cms/backend-customization/routes)
- [Backend customization — controllers](https://docs.strapi.io/cms/backend-customization/controllers)
- [Backend customization — services](https://docs.strapi.io/cms/backend-customization/services)
