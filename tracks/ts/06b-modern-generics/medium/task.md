# Medium — wybór opcji z `NoInfer`

Zaimplementuj `selectOption(options, requested, fallback)`.

- `options` ma być readonly tuple i wyznaczać zamkniętą unię wyniku,
- `requested` pochodzi z runtime jako `string | undefined`,
- jeśli requested występuje w opcjach, zwróć je,
- w przeciwnym razie zwróć fallback,
- fallback musi należeć do opcji i **nie może poszerzać** wywnioskowanej unii.

Użyj `const` type parameter oraz `NoInfer`.
