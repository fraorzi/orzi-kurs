# Wydziel małą interaktywną wyspę

`ProductCard` został oznaczony `"use client"` tylko dlatego, że zawiera przycisk
ulubionych. Przenieś stan i handler do istniejącego `FavoriteButton`.

Po refaktorze `ProductCard.tsx` ma pozostać Server Component bez dyrektywy i bez
hooków. `FavoriteButton.tsx` jest punktem wejścia klienta, przyjmuje wyłącznie
serializowalne `initialFavorite` i przełącza dostępną nazwę przycisku.
