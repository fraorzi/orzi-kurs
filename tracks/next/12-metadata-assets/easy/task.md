# Wygeneruj bezpieczne metadata produktu

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `buildProductMetadata`. Zaczekaj na `params`, odczytaj produkt i dla
braku zwróć tytuł `Produkt niedostępny` oraz `robots: { index: false, follow: false }`.

Dla produktu zwróć title, description, canonical `/products/{encoded slug}` oraz
Open Graph title/description/images z jednym URL-em produktu.
