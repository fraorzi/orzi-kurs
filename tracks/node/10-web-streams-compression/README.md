# Web Streams, adaptery i compression

## Kiedy

Gdy Node współdzieli kod z Web API, przetwarza `fetch().body`, kompresuje odpowiedzi albo wystawia FileHandle jako strumień webowy.

## Pułapki

Konwersja nie usuwa potrzeby obsługi backpressure; locked stream ma jednego czytelnika; uchwyt pliku może pozostać otwarty zależnie od opcji i ścieżki błędu.

## Źródła

- [Node.js 24 API: webstreams,zlib,fs](https://nodejs.org/download/release/latest-v24.x/docs/api/webstreams.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
