# Moduł: produkcyjny analizator NDJSON

Łączy streamy, limity zasobów, anulowanie, błędy danych, agregację i kontrakt CLI. Rozwiązanie nie może zakładać, że cały plik mieści się w pamięci.

## Kryteria ukończenia

- przetwarzanie przyrostowe i limity bajtów oraz linii,
- kontrolowana tolerancja błędnych rekordów,
- propagacja AbortSignal,
- deterministyczne agregaty i testy granic.
