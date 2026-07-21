# Upload Strapi i Next Image

## Kontekst

Strapi po uploadzie zwraca surowe metadane assetu — `url` bywa względny,
`alternativeText` bywa `null`, a nic nie gwarantuje, że `width`/`height` są
sensownymi liczbami całkowitymi. `next/image` ma odwrotne wymagania: jawne
wymiary (żeby uniknąć layout shift) i obrazy wyłącznie z originów wpisanych
do `remotePatterns` w `next.config`. Projekt modeluje warstwę adaptera
między CMS a komponentem Image — miejsce, gdzie dane z zewnętrznego
systemu stają się bezpiecznym, kompletnym kontraktem.

## Decyzje

- Walidacja wymiarów następuje przed budową URL — nieprawidłowe dane
  wejściowe odrzucamy, zanim zaczniemy je przetwarzać.
- `new URL(asset.url, origin)` zamiast konkatenacji stringów — poprawnie
  obsługuje zarówno względne, jak i bezwzględne URL-e jedną linią, bez
  ręcznego parsowania.
- Porównanie originów (`src.origin !== new URL(origin).origin`), nie
  prefiksu stringa — prefiks da się oszukać (`cms.example.com.evil.test`
  zaczyna się od zaufanego originu, ale nim nie jest).
- `alt` zawsze jest stringiem, nigdy `undefined`/`null` — komponent
  `<Image alt={...}>` wymaga stringa; przepuszczenie `null` dalej to błąd
  typu w runtime Reacta.

## Pułapki

- Konkatenacja `origin + asset.url` zamiast `new URL(asset.url, origin)`
  psuje się dla już-bezwzględnych URL-i i dla ścieżek bez wiodącego `/`.
- Porównanie `asset.url.startsWith(origin)` zamiast originów po
  sparsowaniu — omija je URL typu `https://cms.example.com.attacker.test`.
- Zwrócenie `asset.alternativeText` wprost (bez `?? ""`) przepuszcza
  `null`/`undefined` do propsa `alt`.
- Walidacja wymiarów samym `> 0` zamiast `Number.isInteger(...) && >= 1`
  przepuszcza `NaN`, `Infinity` i wartości ułamkowe.

## Źródła (audyt 2026-07-20)

- [Strapi — Media Library / upload](https://docs.strapi.io/cms/features/media-library)
- [Next.js — komponent Image](https://nextjs.org/docs/app/api-reference/components/image)
- [MDN — URL.origin](https://developer.mozilla.org/en-US/docs/Web/API/URL/origin)
