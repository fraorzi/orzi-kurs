# Hard — fetchWithRetry z sensowną polityką ponawiania

Zaimplementuj `fetchWithRetry(url, retries = 2)` — pobiera JSON, ponawiając próbę tylko
wtedy, gdy ma to sens.

## Polityka

- **Sukces (2xx)** → zwróć sparsowany JSON.
- **Błąd sieci** (fetch odrzuca obietnicę) → **ponów**.
- **5xx** (błąd serwera) → **ponów**.
- **4xx** (błąd żądania) → **NIE ponawiaj**, od razu rzuć `` `HTTP ${res.status}` ``.
- Po wyczerpaniu prób rzuć ostatni napotkany błąd.

`retries` to liczba **dodatkowych** prób, więc `retries = 2` daje maksymalnie **3** wywołania
`fetch`.

```js
// 500, 500, 200  → 3 wywołania fetch, zwraca dane
// 500 zawsze     → 3 wywołania, rzuca Error("HTTP 500")
// 404            → 1 wywołanie, rzuca Error("HTTP 404")  (bez ponawiania)
// błąd sieci, 200 → 2 wywołania, zwraca dane
```

Dlaczego tak: 4xx znaczy „Twoje żądanie jest złe" — powtórzenie da ten sam wynik.
5xx i błędy sieci bywają przejściowe.
