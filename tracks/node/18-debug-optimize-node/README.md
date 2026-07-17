# Debugowanie i optymalizacja Node

## Kiedy

Gdy kod jest poprawny funkcjonalnie, ale blokuje event loop, zużywa pamięć proporcjonalną do całego wejścia albo tworzy nieograniczoną współbieżność.

## Pułapki

Optymalizacja bez pomiaru może pogorszyć kod; `Promise.all` nie jest limitem; zwiększenie heapu nie naprawia zatrzymanych listenerów i referencji.

## Źródła

- [Node.js 24 API: perf_hooks,stream,events](https://nodejs.org/download/release/latest-v24.x/docs/api/perf_hooks.html)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
