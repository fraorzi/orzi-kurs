# Klasyczne streamy i backpressure

## Kiedy

Gdy dane są większe od pamięci procesu albo płyną stale: logi, upload, eksport, proxy i transformacje ETL.

## Pułapki

`data` mode łatwo omija backpressure; błędy obu stron muszą dotrzeć do właściciela; granica chunka nie jest granicą linii ani rekordu.

## Źródła

- [Node.js 24 API: stream](https://nodejs.org/download/release/latest-v24.x/docs/api/stream.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
