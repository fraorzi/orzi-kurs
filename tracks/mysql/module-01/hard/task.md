# Zbuduj rdzeń danych marketplace

Utwórz schemat sellers/listings/orders/order_items, wykonaj wersjonowaną migrację public_id i dodaj procedurę place_order.

## Kryteria akceptacji

- Constraints chronią pieniądze, zapas, idempotency request_id i relacje.
- Dwa równoległe zakupy ostatniej sztuki zatwierdzają dokładnie jedno zamówienie.
- Feed sprzedawcy ma indeks tenantowy do stabilnego keysetu i plan potwierdzony EXPLAIN ANALYZE.
- Migracja public_id używa jawnego algorytmu i zapisuje wersję.
