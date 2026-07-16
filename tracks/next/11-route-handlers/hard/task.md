# Utwardź BFF magazynu

Zaimplementuj `createInventoryGET`. Handler pobiera `sku` z query i zwraca 400 dla
pustej wartości. Upstream wywołaj z `Authorization: Bearer ${INVENTORY_API_KEY}` i
`AbortSignal` anulowanym po `timeoutMs`.

Mapuj 404 na własne 404, inne statusy błędu i awarie sieci na 502, timeout na 504.
Z JSON-u zwróć tylko zwalidowane `{ sku: string, available: number }`; nie
przekazuj pola `internalCost` ani surowej odpowiedzi. Zawsze wyczyść timer.
