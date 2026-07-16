# Izolowane widgety z resetowalną granicą błędu

Zaimplementuj `Dashboard` i `WidgetErrorBoundary`.

Każdy widget ma `id`, `title`, `version` i funkcję `render`. Błąd jednego widgetu:

- nie może ukryć pozostałych,
- pokazuje alert `Widget {title} niedostępny`,
- wywołuje `onWidgetError(id, error)`.

Każdy widget potrzebuje własnej granicy. Gdy `version` wadliwego widgetu się
zmieni, granica ma zresetować fallback i spróbować wyrenderować go ponownie.
