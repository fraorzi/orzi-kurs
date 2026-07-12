# Easy — fetchJson i postJson

W testach globalny `fetch` jest podmieniany na atrapę — nie ma tu sieci. Używaj po prostu
globalnego `fetch`.

## 1. `fetchJson(url)`

Pobierz zasób i zwróć sparsowany JSON. Gdy status **nie jest** 2xx (`res.ok === false`),
rzuć `Error` z komunikatem dokładnie `` `HTTP ${res.status}` ``.

```js
await fetchJson("/api/users"); // { ... }  gdy 200
await fetchJson("/api/brak");  // rzuca Error("HTTP 404")
```

Pamiętaj: `fetch` **nie** odrzuca obietnicy przy 404/500 — musisz sprawdzić `res.ok` sam.

## 2. `postJson(url, body)`

Wyślij `POST` z ciałem `body` zserializowanym do JSON-a i nagłówkiem
`Content-Type: application/json`. Sprawdź `res.ok` (jak wyżej) i zwróć sparsowaną odpowiedź.

```js
await postJson("/api/users", { name: "Ala" });
// fetch wywołany z: method "POST",
//   headers { "Content-Type": "application/json" },
//   body '{"name":"Ala"}'
```
