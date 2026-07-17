# CLI z pulą i retry

## Kontekst

CLI importuje wiele plików przez zawodny endpoint, musi ograniczać współbieżność i ponawiać tylko błędy przejściowe.

## Decyzje

Pula zachowuje kolejność wyników, retry ma limit prób i nie ponawia błędów trwałych.

## Źródła

- [Dokumentacja](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html)
- [Dokumentacja](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

