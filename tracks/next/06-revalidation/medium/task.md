# Zapewnij read-your-own-writes w Server Action

`renameProduct` poprawnie zapisuje nazwę, ale używa SWR. Autor mutacji może więc
zaraz po zapisie zobaczyć starą listę lub stary szczegół.

Po udanej mutacji użyj `updateTag` dla tagu listy tenantu oraz tagu konkretnego
produktu. Nie używaj `revalidateTag` ani globalnego tagu bez `tenantId`.
