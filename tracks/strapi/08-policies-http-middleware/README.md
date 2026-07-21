# Policies i middleware HTTP

Strapi rozdziela dwie warstwy przed kontrolerem. **Policy** to czysta
decyzja: `(policyContext, config, { strapi }) => boolean`. Dostaje kontekst
żądania (rolę czyta się z `policyContext.state.user.role`), nic nie
modyfikuje i albo przepuszcza żądanie dalej (`true`), albo je blokuje
(`false` lub rzucony błąd). Rejestruje się je w `src/policies/` (globalne,
prefiks `global::`) albo w `src/api/<nazwa>/policies/` (zakresowe dla
jednej API), a podpina przez tablicę `policies` w konfiguracji trasy.

**Middleware** to fabryka: `(config, { strapi }) => async (ctx, next) => ...`.
W przeciwieństwie do policy middleware **opakowuje** wywołanie — może coś
zrobić przed `next()` (walidacja, korelacja) i coś po nim (nagłówki,
logowanie czasu odpowiedzi), bo trzyma referencję do kontynuacji łańcucha.
Middleware globalne z `config/middlewares.ts` wykonują się w kolejności
tablicy; wbudowane mają prefiks `strapi::` (`strapi::body`, `strapi::cors`,
`strapi::security` itd.) i zwykle poprzedzają middleware własne, chyba że
świadomie wstawisz swój wpis wcześniej.

Kompozycja wielu middleware działa jak cebula: `[a, b]` daje kolejność
`before-a → before-b → handler → after-b → after-a`. To dokładnie ten sam
model, na którym oparty jest cały stos Koa pod Strapi — testując go
lokalnie (bez panelu, bez requestu HTTP), uczysz się właściwego mentalnego
modelu tego, co dzieje się przy każdym prawdziwym żądaniu.

## Kiedy używać

- Policy: authz per trasa, sprawdzanie feature flagi, ownershipu zasobu.
- Middleware: korelacja żądań (`x-request-id`), bezpieczne nagłówki,
  logowanie, transformacje `ctx` współdzielone przez wiele tras.
- Kompozycja middleware, gdy kilka niezależnych trosk (authz + logging +
  walidacja) musi zachować deterministyczną kolejność wykonania.

## Kiedy unikać

- Nie pisz policy, która wykonuje zapis do bazy — to zadanie kontrolera
  albo serwisu, nie warstwy decyzyjnej.
- Nie duplikuj logiki authz w middleware i w policy jednocześnie — wybierz
  jedną warstwę odpowiedzialną za daną decyzję.
- Nie buduj własnego mechanizmu kolejkowania middleware, gdy wystarczy
  standardowa tablica `config/middlewares.ts` z jawną kolejnością.

## Pułapki

- Middleware musi wywołać `next()` dokładnie raz — brak wywołania jest
  poprawnym, świadomym short-circuitem (np. odrzucenie), ale podwójne
  wywołanie łamie kontrakt Koa.
- Błąd rzucony w środku łańcucha pomija „after” wszystkich warstw, które
  jeszcze czekały na `next()` — nie łap go bez potrzeby wewnątrz middleware.
- Nagłówek klienta (np. `x-request-id`) to niezaufany string: waliduj
  format, zanim go przyjmiesz jako identyfikator używany w logach.
- Policy nie ma dostępu do „after" — jeśli potrzebujesz kodu po
  kontrolerze, to zadanie dla middleware, nie policy.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Policies](https://docs.strapi.io/cms/backend-customization/policies)
- [Middlewares](https://docs.strapi.io/cms/backend-customization/middlewares)
- [Middleware configuration](https://docs.strapi.io/cms/configurations/middlewares)
