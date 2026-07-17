# Klient HTTP: fetch i niezawodność

## Kiedy

Gdy backend wywołuje inne usługi i musi kontrolować timeout, rozmiar odpowiedzi, retry oraz znaczenie metod idempotentnych.

## Pułapki

`fetch` nie rzuca dla 4xx/5xx; timeout transportu to nie retry policy; automatyczne ponawianie POST może wykonać operację dwukrotnie.

## Źródła

- [Node.js 24 API: globals,https](https://nodejs.org/download/release/latest-v24.x/docs/api/globals.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
