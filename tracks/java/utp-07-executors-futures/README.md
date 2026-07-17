# Executors i CompletableFuture

## Grupa

UTP

## Kiedy

Gdy zadania I/O mają limit równoległości, kompozycję wyników i kontrolowane zamknięcie executora.

## Pułapki

`commonPool` nie jest domyślnie właściwy dla blokującego I/O; `join` w tym samym małym executorze może zagłodzić pulę.

## Źródła

- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
- [Java SE 25 core libraries](https://docs.oracle.com/en/java/javase/25/core/)
