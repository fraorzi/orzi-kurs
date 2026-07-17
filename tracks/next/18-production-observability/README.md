# Produkcja, obserwowalność i self-hosting

`instrumentation.ts` leży w root projektu (albo `src/` obok `app`) i eksportuje
`register()`. Next wywołuje je raz przy starcie instancji, przed przyjmowaniem
requestów. Side effects importuj wewnątrz `register`; kod zależny od runtime ładuj
warunkowo według `NEXT_RUNTIME`.

Sekrety pozostają na serwerze. Prefiks `NEXT_PUBLIC_` oznacza świadome wbudowanie
wartości do bundla podczas buildu i zamrożenie jej dla danego artefaktu. Runtime
env można czytać podczas dynamicznego renderowania. Konfigurację trzeba walidować
przy starcie, aby awaria była szybka i zrozumiała.

Logi produkcyjne powinny być strukturalne i korelowane przez request ID, ale bez
query, cookies, tokenów i PII. Instrumentacja mierzy trasy i zależności, nie zastępuje
logów domenowych ani alertów opartych na SLO.

Self-hosting wielu instancji wymaga reverse proxy, spójnego buildu, deployment ID,
wspólnego klucza Server Actions, współdzielonego cache/tag invalidation i wyłączenia
buforowania streamingu. Platforma powinna dać 10–30 s na drain requestów i `after()`.

## Kiedy używać

- Walidacji env i rejestracji telemetry przy starcie instancji.
- Strukturalnych logów z request ID, statusem i czasem bez sekretów.
- Shared cache i koordynacji tagów przy więcej niż jednej instancji.
- `output: "standalone"` dla małego obrazu kontenera z pełnym runtime Next.

## Kiedy unikać

- Logowania całych requestów, nagłówków albo obiektów użytkownika.
- `NEXT_PUBLIC_` dla sekretu lub wartości zmienianej dopiero przy deployu.
- Lokalnego cache na ephemeral disk jako źródła spójności wielu podów.
- Static export, jeśli aplikacja potrzebuje Actions, Proxy, dynamic rendering lub streaming.

## Pułapki

- Globalny import biblioteki Node uruchamiany także w innym runtime.
- Każda replika z innym buildem lub kluczem szyfrowania Actions.
- Rewalidacja tagu tylko w jednym podzie.
- Reverse proxy buforujący cały stream.
- Readiness zwracające 200 mimo braku wymaganej konfiguracji lub zależności.

## Źródła

- <https://nextjs.org/docs/app/guides/instrumentation>
- <https://nextjs.org/docs/app/guides/environment-variables>
- <https://nextjs.org/docs/app/guides/self-hosting>
- <https://nextjs.org/docs/app/guides/production-checklist>
