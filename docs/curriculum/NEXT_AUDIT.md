# Audyt curriculum Next.js

Data audytu: 2026-07-16.

## Wniosek

Next powinien być kontynuacją ukończonych tracków TypeScript i React, a nie kursem
składni frameworka od zera. Docelowy poziom mid oznacza umiejętność wyznaczania
granic wykonania, cache'u, bezpieczeństwa i testów w pełnym przepływie produktu.

Plan ma właściwe główne hasła, ale wymaga dwóch zabezpieczeń:

- każde API musi odpowiadać dokładnie zainstalowanemu Next `16.2.10`, ponieważ
  wcześniejsze modele cache'u, synchroniczne propsy routingu i `middleware.ts`
  prowadzą dziś do błędnych rozwiązań;
- zadania nie mogą udawać, że unit test Vitest odtwarza runtime React Server
  Components. Oficjalne docs zalecają E2E dla async Server Components.

## Model Next 16.2

- App Router opiera się na Server Components, Suspense i Server Functions.
- Layouty i strony są Server Components domyślnie; `"use client"` wyznacza punkt
  wejścia do client bundle, a propsy przekraczające granicę muszą być serializowalne.
- `params` i `searchParams` stron są Promise. Synchroniczne przykłady z dawnych
  kursów nie są właściwym kontraktem dla tej wersji.
- Cache Components jest opt-in przez `cacheComponents: true`. Dynamiczna praca jest
  domyślnie wykonywana na request, a static shell powstaje z deterministycznej pracy,
  `use cache` i fallbacków Suspense.
- `use cache`, `cacheLife` i `cacheTag` zastępują dużą część dawnych route segment
  configs. Klucz obejmuje argumenty i przechwycone wartości podlegające serializacji.
- `updateTag` jest ograniczone do Server Actions i daje read-your-own-writes.
  `revalidateTag(tag, "max")` stosuje stale-while-revalidate dla treści, które mogą
  być chwilowo stare; `revalidatePath` dotyczy konkretnej ścieżki UI.
- Plik `proxy.ts` zastępuje nazwę `middleware.ts`. Proxy jest granicą routingu i
  optymistycznych przekierowań, nie jedyną warstwą autoryzacji.

## Kolejność

1. Struktura App Router i dziedziczenie layoutów.
2. Granice Server/Client oraz serializacja.
3. Dane serwerowe, równoległość i eliminacja waterfalls.
4. Cache Components, `use cache`, lifetime, tagi i rewalidacja.
5. Dynamiczne trasy, URL jako stan nawigacji i odporne granice UI.
6. Server Actions i Route Handlers jako osobne kontrakty mutacji/HTTP.
7. Metadata i zasoby, authn/authz z DAL, Proxy oraz streaming.
8. Dostępne formularze, strategia testów, instrumentacja i wdrożenie.
9. Debug granic oraz optymalizacja po pomiarze.
10. Dwa moduły integracyjne bez gotowej architektury podanej wprost.

## Strategia zadań i testów

Każdy temat dostaje easy/medium/hard, a moduły są wieloplikowe. Zadania mają
modelować m.in. review zastanego kodu, zmianę niepełnego feature'u, regresję cache'u,
autoryzację blisko danych, limity requestu i diagnozę waterfallu — nie tylko
przepisywanie snippetów.

Harness używa jsdom dla Client Components, ścisłego TypeScriptu i hook lint. Dla
funkcji serwerowych oraz Route Handlers testuje czyste granice i rzeczywiste obiekty
Request/Response. Synchroniczne komponenty można testować przez Testing Library.
Async Server Components wymagają testów kontraktów niższego poziomu, a pełny runtime
powinien być sprawdzany E2E w projekcie; curriculum nie nazywa prostego wywołania
funkcji pełnym testem RSC.

Nie uruchamiamy dev serwera ani builda w automatycznych bramkach pojedynczych zadań.
Dzięki temu testy są szybkie i deterministyczne, a ograniczenie jest jawne w teorii.

## Typowe luki kursów, których unikamy

- przenoszenie całej aplikacji do Client Components dla wygody,
- sekwencyjne `await`, które tworzą waterfall mimo niezależnych danych,
- kopiowanie modelu implicit fetch cache ze starszych wersji Next,
- używanie `revalidateTag` i `updateTag` zamiennie bez semantyki świeżości,
- traktowanie Proxy jako kompletnego auth gate bez sprawdzenia w DAL/Action/Handler,
- ufanie typom `FormData`, JSON i params bez walidacji runtime,
- testowanie async Server Components wyłącznie jak zwykłych komponentów React,
- pomijanie pending/error/not-found, focusu, metadanych i produkcyjnej diagnostyki,
- optymalizacja client bundle lub cache'u bez dowodu z profilu i zachowania danych.

## Kryterium ukończenia

- wyłącznie `.ts`/`.tsx`, bez wariantów JavaScript/JSX;
- każde rozwiązanie i każdy starter przechodzi właściwą bramkę;
- teoria rozróżnia stabilne API 16.2, ograniczenia i starsze wzorce;
- moduły obejmują routing, dane, cache, mutację, authz, dostępność i diagnostykę;
- uczeń potrafi uzasadnić granicę client/server i strategię świeżości;
- strategia testów jawnie rozdziela unit, integration i E2E.

## Źródła bazowe

- Dokumentacja dostarczona z `next@16.2.10`: `node_modules/next/dist/docs/01-app/`.
- App Router: <https://nextjs.org/docs/app>
- Server i Client Components:
  <https://nextjs.org/docs/app/getting-started/server-and-client-components>
- Cache Components: <https://nextjs.org/docs/app/getting-started/caching>
- Migracja do Cache Components:
  <https://nextjs.org/docs/app/guides/migrating-to-cache-components>
- Authentication: <https://nextjs.org/docs/app/guides/authentication>
- Data security: <https://nextjs.org/docs/app/guides/data-security>
- Testing: <https://nextjs.org/docs/app/guides/testing>
- Production checklist: <https://nextjs.org/docs/app/guides/production-checklist>
- Oficjalny Next Learn dashboard: <https://nextjs.org/learn/dashboard-app>
