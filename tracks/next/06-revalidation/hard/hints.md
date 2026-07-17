## Hint 1

Route Handler może użyć `revalidateTag`, ale nie `updateTag`.

## Hint 2

Sprawdź, czy payload jest obiektem z dokładnym eventem oraz niepustymi stringami
`tenantId` i `slug`.

## Hint 3

Każdy tag wywołaj z drugim argumentem `{ expire: 0 }`, bo wymaganie webhooka mówi o
natychmiastowym wygaśnięciu.
