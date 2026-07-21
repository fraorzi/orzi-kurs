## Hint 1

Pierwszy warunek to strażnik akcji: `if (action !== "findMany") return params;`
— reszta funkcji dotyczy wyłącznie odczytu listy.

## Hint 2

Filtry buduj przez spread, nie przez nadpisanie: `{ ...existingFilters, tenantId }`,
gdzie `existingFilters` to `params.filters` albo `{}`, gdy go brak.

## Hint 3

Cały zwracany obiekt też twórz przez spread `{ ...params, status: "published", filters: ... }`
— to gwarantuje nowy obiekt i zachowanie pól, o których middleware nic nie wie.
