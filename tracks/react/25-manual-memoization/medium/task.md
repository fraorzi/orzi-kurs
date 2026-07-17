# Stabilny callback do zmierzonego potomka

Profiler wykazał, że `ExportButton` niepotrzebnie renderuje się po zmianie trybu
widoku dashboardu. Komponent jest już opakowany w `memo`, ale inline callback
zmienia referencję przy każdym renderze rodzica.

W `ExportDashboard` ustabilizuj callback przez `useCallback`. Musi on nadal
używać aktualnego `reportId` i aktualnej funkcji `onExport`. Zmiana trybu
`Kompaktowy` nie może commitować poddrzewa przycisku.

