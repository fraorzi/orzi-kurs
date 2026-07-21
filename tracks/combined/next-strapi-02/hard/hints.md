# Hints

## Hint 1

Sprawdź wymiary jako pierwsze: `Number.isInteger(width) && width >= 1`
(i tak samo dla `height`). Sam test `> 0` przepuszcza `NaN` i ułamki.

## Hint 2

Do połączenia URL-a z originem użyj `new URL(asset.url, origin)` — obsłuży
zarówno ścieżki względne, jak i już-bezwzględne adresy jedną linią.

## Hint 3

Porównuj `src.origin !== new URL(origin).origin`, nie `startsWith` —
porównanie prefiksu stringa omija URL typu
`https://cms.example.com.attacker.test`. Alt buduj przez
`asset.alternativeText?.trim() ?? ""`, żeby nigdy nie zwrócić `null`.
