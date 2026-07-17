# Domena statusu sieci i debug label

Zaimplementuj `useNetworkStatus(source)` i komponent `SaveAvailability`.

Hook ma subskrybować zewnętrzne źródło przez `useSyncExternalStore`, zwracać
aktualny boolean i dodać przez `useDebugValue` etykietę `Online` albo `Offline`.
Użyj funkcji formatującej jako drugiego argumentu `useDebugValue`.

Przycisk ma pokazywać `Zapisz` online oraz być wyłączony z tekstem
`Brak połączenia` offline.
