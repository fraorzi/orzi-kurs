# Audyt tracka Strapi 5

Data: 2026-07-17. Wersja sprawdzona w npm: `@strapi/strapi@5.50.2`.

## Zakres i kolejność

Track zaczyna się od struktury projektu, typów i modelowania treści, następnie
przechodzi do semantyki dokumentu, publikacji, locale i REST. Dopiero po tych
fundamentach wprowadza auth, własne warstwy backendu, policies, middleware,
transakcje i integracje operacyjne. Kończy się debugowaniem, optymalizacją po
pomiarze oraz pionowym modułem backendowym.

Kolejność usuwa typowy błąd migracji z v4: uczeń nie buduje custom API na Entity
Service ani numerycznym `id`, zanim zrozumie `documentId` i warianty dokumentu.

## Decyzje jakościowe

- Cały track jest TypeScript-first i ma 46 starterów, 46 rozwiązań, lokalne testy
  oraz co najmniej trzy progresywne hinty na zadanie.
- Document Service jest domyślną warstwą contentu; lifecycle hooks są omawiane
  razem z ryzykiem wielokrotnych operacji bazowych.
- Własne kontrolery muszą sanitizować niesanitizowany output Document Service.
- Publiczne odczyty jawnie wybierają `published` i allow-listę pól.
- Startery `[O]` są poprawne funkcjonalnie i oblewają wyłącznie testy `[quality]`
  mierzące zakres populate, liczbę wywołań lub zasięg invalidacji.
- Testowy adapter otwiera efemeryczny port tylko na czas testu i sprawdza prawdziwe
  `Request`/`Response`; nie uruchamia dev servera ani panelu admin.

## Dowody

- kontrakt treści i kolejność: 17/17,
- rozwiązania przed końcowym rozszerzeniem HTTP: 46/46,
- pierwotne startery po naprawie dwóch zbyt łatwych bramek: sprawdzone punktowo;
  pełny przebieg pozostaje częścią audytu końcowego,
- root `tsc --noEmit` i lint: bez błędów po dodaniu adaptera HTTP.

## Źródła pierwotne

- [Document Service API](https://docs.strapi.io/cms/api/document-service)
- [REST API](https://docs.strapi.io/cms/api/rest)
- [Routes](https://docs.strapi.io/cms/backend-customization/routes)
- [Controllers](https://docs.strapi.io/cms/backend-customization/controllers)
- [Policies](https://docs.strapi.io/cms/backend-customization/policies)
- [Middleware](https://docs.strapi.io/cms/backend-customization/middlewares)
- [Testing](https://docs.strapi.io/cms/testing)
- [Webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)

## Quality pass (2026-07-20)

Pierwotna wersja tracka miała poprawny zakres i rozwiązania, ale warstwę
dydaktyczną poniżej standardu repo: 42 z 46 testów było pojedynczym
`it("...")`, README ~13–16 linii, task.md 1–2 zdania z powtarzaną wklejką.
Quality pass przepisał warstwę dydaktyczną wszystkich 15 tematów i modułu,
bez zmian w rozwiązaniach wzorcowych (poza reformatowaniem czytelności):

- **Testy**: 3–6 nazwanych testów zachowania per zadanie (≥6 dla modułu),
  wymuszające sedno tematów: semantyka `documentId` vs `id`, draft/published
  i locale w Document Service, filtrowanie/populacja REST, granice public vs
  authenticated, kolejność policy/middleware, lifecycle bez podwójnych
  powiadomień, walidacja z kodami błędów, idempotencja webhooków. Zadania
  `[D]` (14) diagnozują realne incydenty (brak populate, wyciek draftu),
  `[O]` (14b) mierzą pracę przez liczniki (rozmiar fetch, liczba zapytań,
  precyzja tagów cache), nigdy czas.
- **README** każdego tematu: model mentalny Strapi 5 + Kiedy/Pułapki/Źródła
  z linkami do docs.strapi.io.
- **Hinty**: 3 progresywne, specyficzne, unikalne per zadanie.
- **Kontrakt treści** (`harness/strapi-content.test.ts`): wymusza sekcje
  i objętość README, ≥3 testy (≥6 dla modułu), ≥3 hinty, unikalność hints,
  znaczniki `[quality]` w 14b.

Macierz końcowa: 46/46 rozwiązań i 46/46 starterów, kontrakt treści 4/4,
root `tsc --noEmit` czysty.
