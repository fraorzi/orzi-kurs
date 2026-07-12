## Hint 1

`fetch` zwraca `Response`. Sam nie rzuca przy 404/500 — sprawdź `res.ok` (true dla 200–299)
i rzuć `new Error(\`HTTP ${res.status}\`)`. Dopiero potem `return res.json()`.

## Hint 2

```js
export async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body), // body to STRING, nie obiekt
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```
