# Lokalizacja bez prop drillingu

Zaimplementuj `LocaleProvider` i `Greeting`.

`LocaleProvider` otrzymuje `locale: "pl" | "en"` oraz `children` i udostępnia locale
przez context, używając składni React 19 `<LocaleContext value={...}>`.

`Greeting` czyta context i renderuje nagłówek `Witaj!` dla `pl` albo `Welcome!`
dla `en`. Zagnieżdżony provider ma nadpisywać wartość tylko dla własnej podgałęzi.
