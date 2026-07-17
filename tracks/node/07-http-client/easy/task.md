# Easy — sprawdź status i typ odpowiedzi

`fetch` nie odrzuca promise dla statusu 500 — walidacja odpowiedzi to twoja
robota. Zaimplementuj `solve<T>(url, fetcher)`:

- wykonaj żądanie przez **wstrzyknięty** `fetcher` (ten sam kontrakt co
  globalny `fetch`);
- gdy `response.ok` jest fałszywe, rzuć `Error` zawierający status
  (np. `"HTTP 503"`);
- gdy nagłówek `content-type` nie zawiera `application/json`, rzuć `Error` —
  zanim tkniesz body;
- w happy path zwróć `await response.json()` jako `T`.
