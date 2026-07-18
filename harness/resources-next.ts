import type { LearningResource } from "./resources";

// Audyt: 2026-07-18. Wersja docelowa: Next.js 16.2.10.
export const NEXT_TOPIC_RESOURCES: Record<string, LearningResource[]> = {
  "01-app-router-structure": [
    {
      title: "Struktura projektu App Router",
      url: "https://nextjs.org/docs/app/getting-started/project-structure",
      description:
        "Specjalne pliki routingu, colocation, foldery prywatne i organizacja katalogu app.",
    },
    {
      title: "Layouty i strony",
      url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages",
      description:
        "Hierarchia layoutów i stron oraz zachowanie współdzielonego UI podczas nawigacji.",
    },
    {
      title: "Route Groups",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/route-groups",
      description: "Organizacja tras i alternatywne layouty bez dodawania segmentu do URL.",
    },
  ],
  "02-server-client-boundaries": [
    {
      title: "Server i Client Components",
      url: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
      description:
        "Dobór środowiska komponentu, serializowalne propsy i ograniczanie bundla klienta.",
    },
    {
      title: "Dyrektywa use client",
      url: "https://nextjs.org/docs/app/api-reference/directives/use-client",
      description: "Granica client module graph oraz kontrakt danych przekazywanych z serwera.",
    },
    {
      title: "Bezpieczeństwo danych",
      url: "https://nextjs.org/docs/app/guides/data-security",
      description: "DAL, DTO, server-only i ochrona danych na granicach Server Components.",
    },
  ],
  "03-server-data-fetching": [
    {
      title: "Pobieranie danych",
      url: "https://nextjs.org/docs/app/getting-started/fetching-data",
      description: "Asynchroniczne Server Components, równoległe odczyty i unikanie waterfalli.",
    },
    {
      title: "Response.ok",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok",
      description: "Sprawdzanie statusu odpowiedzi HTTP przed odczytem i walidacją payloadu.",
    },
    {
      title: "Promise.all()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
      description: "Równoległe oczekiwanie na niezależne operacje i propagacja ich błędów.",
    },
  ],
  "04-cache-components": [
    {
      title: "Cache Components",
      url: "https://nextjs.org/docs/app/getting-started/caching",
      description: "Statyczny shell, dynamiczne fragmenty, Suspense i model cache w Next.js 16.",
    },
    {
      title: "Konfiguracja cacheComponents",
      url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents",
      description: "Stabilna flaga włączająca Cache Components i prerenderowanie mieszanego UI.",
    },
    {
      title: "Migracja do Cache Components",
      url: "https://nextjs.org/docs/app/guides/migrating-to-cache-components",
      description: "Migracja ze starszych flag i rozwiązywanie granic blokujących prerender.",
    },
  ],
  "05-use-cache": [
    {
      title: "Dyrektywa use cache",
      url: "https://nextjs.org/docs/app/api-reference/directives/use-cache",
      description:
        "Zakres cache, budowanie klucza, serializacja argumentów i wartości przechwyconych.",
    },
    {
      title: "Funkcja cacheLife",
      url: "https://nextjs.org/docs/app/api-reference/functions/cacheLife",
      description: "Profile stale, revalidate i expire opisujące tolerancję świeżości danych.",
    },
    {
      title: "Funkcja cacheTag",
      url: "https://nextjs.org/docs/app/api-reference/functions/cacheTag",
      description: "Domenowe tagowanie wpisów do precyzyjnego unieważniania cache.",
    },
  ],
  "06-revalidation": [
    {
      title: "Rewalidacja danych",
      url: "https://nextjs.org/docs/app/getting-started/revalidating",
      description: "Dobór rewalidacji według świeżości, zakresu danych i miejsca wywołania.",
    },
    {
      title: "Funkcja updateTag",
      url: "https://nextjs.org/docs/app/api-reference/functions/updateTag",
      description: "Natychmiastowe wygaśnięcie tagu w Server Action dla read-your-own-writes.",
    },
    {
      title: "Funkcja revalidateTag",
      url: "https://nextjs.org/docs/app/api-reference/functions/revalidateTag",
      description: "SWR, profile cache i rewalidacja tagów z Server Functions oraz Route Handlers.",
    },
  ],
  "07-dynamic-routes": [
    {
      title: "Dynamiczne segmenty tras",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes",
      description: "Segmenty dynamiczne, catch-all, optional catch-all i asynchroniczne params.",
    },
    {
      title: "generateStaticParams",
      url: "https://nextjs.org/docs/app/api-reference/functions/generate-static-params",
      description: "Prerenderowanie wybranych parametrów bez zastępowania walidacji runtime.",
    },
    {
      title: "Funkcja notFound",
      url: "https://nextjs.org/docs/app/api-reference/functions/not-found",
      description: "Przerwanie renderowania nieistniejącego zasobu i uruchomienie UI 404.",
    },
  ],
  "08-navigation-url-state": [
    {
      title: "Linkowanie i nawigacja",
      url: "https://nextjs.org/docs/app/getting-started/linking-and-navigating",
      description: "Link, prefetch, historia przeglądarki oraz nawigacja push i replace.",
    },
    {
      title: "searchParams strony",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional",
      description: "Odczyt i typowanie query stringu w Server Component strony.",
    },
    {
      title: "Hook useSearchParams",
      url: "https://nextjs.org/docs/app/api-reference/functions/use-search-params",
      description: "Odczyt parametrów URL w Client Component bez duplikowania stanu.",
    },
  ],
  "09-loading-errors-not-found": [
    {
      title: "Obsługa błędów",
      url: "https://nextjs.org/docs/app/getting-started/error-handling",
      description: "Oczekiwane błędy jako wyniki oraz granice błędów i stron 404.",
    },
    {
      title: "Plik loading",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      description: "Fallback segmentu, natychmiastowa nawigacja i automatyczna granica Suspense.",
    },
    {
      title: "Plik error",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/error",
      description: "Client Error Boundary segmentu, reset i izolowanie nieoczekiwanych awarii.",
    },
  ],
  "10-server-actions": [
    {
      title: "Mutowanie danych",
      url: "https://nextjs.org/docs/app/getting-started/mutating-data",
      description: "Formularze, Server Actions, wyniki mutacji i aktualizacja interfejsu.",
    },
    {
      title: "Server Actions i mutacje",
      url: "https://nextjs.org/docs/app/guides/server-actions",
      description: "Kontrakty wywołania, kolejność, argumenty i wzorce organizacji Actions.",
    },
    {
      title: "Bezpieczeństwo danych",
      url: "https://nextjs.org/docs/app/guides/data-security",
      description:
        "Walidacja wejścia, authentication i authorization w publicznych operacjach serwera.",
    },
  ],
  "11-route-handlers": [
    {
      title: "Route Handlers",
      url: "https://nextjs.org/docs/app/getting-started/route-handlers",
      description: "Tworzenie endpointów HTTP z Web Request i Response API.",
    },
    {
      title: "Konwencja route.ts",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/route",
      description: "Obsługiwane metody, parametry kontekstu, cache i zachowanie route.ts.",
    },
    {
      title: "Next.js jako Backend for Frontend",
      url: "https://nextjs.org/docs/app/guides/backend-for-frontend",
      description: "Walidacja, limity, proxy upstreamu i bezpieczny kontrakt odpowiedzi BFF.",
    },
  ],
  "12-metadata-assets": [
    {
      title: "Metadata i obrazy Open Graph",
      url: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
      description: "Statyczne i dynamiczne metadata oraz generowanie bezpiecznych obrazów OG.",
    },
    {
      title: "Optymalizacja obrazów",
      url: "https://nextjs.org/docs/app/getting-started/images",
      description: "Komponent Image, zdalne źródła, wymiary, priorytet i ograniczanie CLS.",
    },
    {
      title: "Ładowanie skryptów",
      url: "https://nextjs.org/docs/app/guides/scripts",
      description:
        "Strategie next/script i ograniczanie wpływu skryptów zewnętrznych na interakcję.",
    },
  ],
  "13-auth-data-access": [
    {
      title: "Authentication w Next.js",
      url: "https://nextjs.org/docs/app/guides/authentication",
      description: "Sesje, cookies, authorization i dobór biblioteki uwierzytelniania.",
    },
    {
      title: "Data Access Layer i DTO",
      url: "https://nextjs.org/docs/app/guides/data-security#data-access-layer",
      description: "Centralizacja authz blisko danych i zwracanie minimalnych modeli widoku.",
    },
    {
      title: "Ochrona przed environment poisoning",
      url: "https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning",
      description: "server-only i wykrywanie importów serwerowych w grafie klienta.",
    },
  ],
  "14-proxy": [
    {
      title: "Konwencja Proxy",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy",
      description: "Matcher, redirect, rewrite, nagłówki i migracja z middleware do Proxy.",
    },
    {
      title: "Optimistic checks w Proxy",
      url: "https://nextjs.org/docs/app/guides/authentication#optimistic-checks-with-proxy-optional",
      description: "Tanie wstępne sprawdzenie sesji bez zastępowania authorization przy danych.",
    },
    {
      title: "Testowanie Proxy",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy#unit-testing-experimental",
      description: "Oficjalne helpery do testowania matchera, redirectu i rewrite'u.",
    },
  ],
  "15-streaming": [
    {
      title: "Streaming w App Routerze",
      url: "https://nextjs.org/docs/app/guides/streaming",
      description:
        "Static shell, granice Suspense i przesuwanie dynamicznego dostępu w dół drzewa.",
    },
    {
      title: "Plik loading",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      description: "Page-level fallback oraz automatyczna granica streamingu segmentu.",
    },
    {
      title: "Streams API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Streams_API",
      description: "Web Streams, backpressure i strumieniowe odpowiedzi bez buforowania całości.",
    },
  ],
  "16-accessible-forms": [
    {
      title: "Formularze z Server Actions",
      url: "https://nextjs.org/docs/app/guides/forms",
      description: "Walidacja, useActionState, pending i progressive enhancement formularza.",
    },
    {
      title: "Hook useActionState",
      url: "https://react.dev/reference/react/useActionState",
      description: "Łączenie wyniku Action, oczekiwanych błędów i stanu oczekiwania z formularzem.",
    },
    {
      title: "Dostępne komunikaty formularzy",
      url: "https://www.w3.org/WAI/tutorials/forms/notifications/",
      description: "Łączenie błędów z polami, live regions i czytelne komunikowanie wyniku.",
    },
  ],
  "17-testing": [
    {
      title: "Testy jednostkowe z Vitest",
      url: "https://nextjs.org/docs/app/guides/testing/vitest",
      description: "Zakres testów unit oraz ograniczenia async Server Components.",
    },
    {
      title: "Testy E2E z Playwright",
      url: "https://nextjs.org/docs/app/guides/testing/playwright",
      description: "Testowanie routingu, hydratacji i krytycznych ścieżek w działającej aplikacji.",
    },
    {
      title: "Testowanie Proxy",
      url: "https://nextjs.org/docs/app/api-reference/file-conventions/proxy#unit-testing-experimental",
      description: "Oficjalne helpery do deterministycznych testów funkcji Next.js Proxy.",
    },
  ],
  "18-production-observability": [
    {
      title: "Instrumentacja",
      url: "https://nextjs.org/docs/app/guides/instrumentation",
      description: "Kod startowy instancji, telemetry, OpenTelemetry i rozdzielenie runtime'ów.",
    },
    {
      title: "Zmienne środowiskowe",
      url: "https://nextjs.org/docs/app/guides/environment-variables",
      description:
        "Sekrety serwera, NEXT_PUBLIC i różnica między wartościami build-time i runtime.",
    },
    {
      title: "Self-hosting Next.js",
      url: "https://nextjs.org/docs/app/guides/self-hosting",
      description:
        "Reverse proxy, wiele instancji, współdzielony cache, streaming i deployment ID.",
    },
  ],
  "19-debug-next-boundaries": [
    {
      title: "Zapobieganie flashowi przed hydratacją",
      url: "https://nextjs.org/docs/app/guides/preventing-flash-before-hydration",
      description: "Diagnozowanie różnic między HTML serwera a pierwszym renderem klienta.",
    },
    {
      title: "Granice Server i Client Components",
      url: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
      description: "Audyt use client, grafu modułów i importów zależnych od środowiska.",
    },
    {
      title: "Błąd blocking route",
      url: "https://nextjs.org/docs/messages/blocking-route",
      description: "Diagnoza uncached data poza Suspense przy włączonych Cache Components.",
    },
  ],
  "19b-optimize-next": [
    {
      title: "Ograniczanie bundla klienta",
      url: "https://nextjs.org/docs/app/getting-started/server-and-client-components#reducing-js-bundle-size",
      description: "Przesuwanie granicy use client do najmniejszej interaktywnej części drzewa.",
    },
    {
      title: "Równoległe pobieranie danych",
      url: "https://nextjs.org/docs/app/getting-started/fetching-data#parallel-data-fetching",
      description: "Usuwanie waterfalli przez równoczesne uruchamianie niezależnych operacji.",
    },
    {
      title: "Klucze use cache",
      url: "https://nextjs.org/docs/app/api-reference/directives/use-cache#cache-keys",
      description: "Ograniczanie cardinality klucza bez utraty izolacji użytkowników i tenantów.",
    },
  ],
  "module-01": [
    {
      title: "Data Access Layer",
      url: "https://nextjs.org/docs/app/guides/data-security#data-access-layer",
      description: "Centralne odczyty, authorization przy zasobie i minimalne DTO.",
    },
    {
      title: "Formularze i Server Actions",
      url: "https://nextjs.org/docs/app/guides/forms",
      description: "Bezpieczne mutacje, walidacja FormData i wyniki oczekiwanych błędów.",
    },
    {
      title: "Rewalidacja danych",
      url: "https://nextjs.org/docs/app/getting-started/revalidating",
      description: "Odświeżanie list i encji dopiero po potwierdzonej mutacji.",
    },
  ],
  "module-02": [
    {
      title: "Cache Components",
      url: "https://nextjs.org/docs/app/getting-started/caching",
      description: "use cache, lifetime, tagi tenantowe i łączenie shellu ze świeżymi danymi.",
    },
    {
      title: "Streaming",
      url: "https://nextjs.org/docs/app/guides/streaming",
      description: "Niezależne granice Suspense i zachowanie użytecznego statycznego shellu.",
    },
    {
      title: "Instrumentacja",
      url: "https://nextjs.org/docs/app/guides/instrumentation",
      description: "Telemetry operacji domenowych i bezpieczna inicjalizacja obserwowalności.",
    },
  ],
};
