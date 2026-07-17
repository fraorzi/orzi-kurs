# URL, ścieżki i system plików

## Kiedy

Gdy kod czyta uploady, konfigurację lub artefakty i musi działać między platformami bez traversal, TOCTOU oraz częściowych zapisów.

## Pułapki

Normalizacja tekstowej ścieżki nie zatrzymuje symlinków; sprawdzenie `exists` przed operacją tworzy wyścig; uchwyty plików trzeba zawsze zamykać.

## Źródła

- [Node.js 24 API: url,path,fs](https://nodejs.org/download/release/latest-v24.x/docs/api/url.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
