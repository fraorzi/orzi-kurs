# Oddziel dane wykresu od jego reguł CSS

Zrefaktoruj `MetricChart`. Korzeń ma udostępniać `--chart-accent`, a każdy słupek
`--bar-ratio` z wartością od `0` do `1`. Typy mają wymieniać dokładnie obsługiwane
custom properties.

Zostaw statyczne klasy dla layoutu i wyglądu. Nie ustawiaj w JSX `height`,
`backgroundColor` ani innych końcowych reguł wizualnych. Zachowaj dostępną nazwę
wykresu i semantykę `meter` z surową wartością każdego punktu.
