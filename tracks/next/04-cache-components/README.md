# Cache Components: static shell i dynamiczne granice

W Next 16 Cache Components włącza się przez `cacheComponents: true`. Ten jeden
stabilny przełącznik zastąpił wcześniejsze eksperymentalne flagi `dynamicIO`,
`useCache` i PPR. Po włączeniu framework buduje statyczny shell, a pracę zależną od
requestu wykonuje w dynamicznych fragmentach streamowanych później.

Asynchroniczność sama w sobie nie oznacza dynamicznego renderowania. Czyste,
deterministyczne obliczenie może zakończyć się podczas prerenderu. Długowieczny
fragment oznaczony `use cache` może wejść do shellu. Z kolei `cookies()`, `headers()`,
nieznane dynamiczne `params` i świeże I/O wymagają requestu.

## Granica Suspense

Dynamiczny fragment powinien znaleźć się pod najbliższym sensownym `<Suspense>`.
Fallback trafia do statycznego shellu, a właściwa treść jest streamowana po
rozwiązaniu pracy request-time. Granica postawiona zbyt wysoko usuwa użyteczną
treść z pierwszej odpowiedzi; postawiona zbyt nisko może tworzyć migoczący interfejs
z wieloma przypadkowymi skeletonami.

Krótki profil cache, na przykład `seconds`, jest wyłączany z prerenderu i również
tworzy dynamiczną dziurę. Sam `<Suspense>` nie zmienia synchronicznego komponentu w
dynamiczny — opisuje jedynie sposób oczekiwania na pracę, która faktycznie blokuje.

## Kiedy używać

- `cacheComponents: true` dla aktualnego modelu cache i Partial Prerendering.
- Statycznego shellu dla nawigacji, nagłówków i deterministycznego UI.
- Wąskiego Suspense dla personalizacji i świeżych danych request-time.
- Jawnego audytu grafu renderowania przy błędzie `Uncached data was accessed
  outside of <Suspense>`.

## Pułapki

- Kopiowanie flag `experimental.ppr` lub `experimental.dynamicIO` ze starszych kursów.
- Uznawanie każdego `async function` za dynamiczny fragment.
- Owijanie całego `body` w Suspense z pustym fallbackiem i przypadkowe usunięcie shellu.
- Czytanie runtime API poza Suspense i blokowanie prerenderu trasy.
- Oczekiwanie, że Suspense sam cache'uje dane.
- Traktowanie prostego testu źródła jak dowodu zachowania produkcyjnego PPR; pełny
  shell i streaming należy dodatkowo sprawdzać buildem lub E2E w projekcie.

## Źródła

- <https://nextjs.org/docs/app/getting-started/caching>
- <https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents>
- <https://nextjs.org/docs/app/guides/migrating-to-cache-components>
- <https://react.dev/reference/react/Suspense>
