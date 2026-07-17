# Obserwowalność procesu

## Kiedy

Gdy trzeba połączyć logi z żądaniem, mierzyć saturację event loopa i publikować telemetryczne zdarzenia bez twardego sprzężenia z vendor SDK.

## Pułapki

Logi nie mogą zawierać sekretów ani nieograniczonych obiektów; histogram event loopa raportuje nanosekundy; kanał diagnostyczny nie zastępuje obsługi błędów.

## Źródła

- [Node.js 24 API: perf_hooks,diagnostics_channel,process](https://nodejs.org/download/release/latest-v24.x/docs/api/perf_hooks.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
