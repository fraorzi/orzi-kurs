## Hint 1

Najpierw zachowaj dwa promise'y: `getUser(slug)` i `getFeatureFlags()`.

## Hint 2

Musisz poznać użytkownika przez `await userPromise`, zanim wywołasz
`getOrders(user.id)`.

## Hint 3

Po uzyskaniu użytkownika użyj `Promise.all` dla wcześniej uruchomionego
`flagsPromise` i nowego `getOrders(user.id)`.
