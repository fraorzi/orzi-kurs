## Hint 1

`ParamKeys` to typ rekurencyjny. Pierwsza gałąź odcina parametr, po którym jest jeszcze
`/`, i wraca do siebie z resztą ścieżki:

```ts
P extends `${string}:${infer Param}/${infer Rest}` ? Param | ParamKeys<Rest> : ...
```

## Hint 2

Parametr na końcu wzorca (`"/users/:id"`) nie ma po sobie ukośnika — nie wpadnie w pierwszą
gałąź. Potrzebna druga: `P extends \`${string}:${infer Param}\` ? Param : never`.
Kolejność ma znaczenie: najpierw ta z `/`, potem ta bez.

## Hint 3

`PathParams<P>` to jedna linijka: `Record<ParamKeys<P>, string>`. Dla wzorca bez parametrów
`ParamKeys` daje `never`, a `Record<never, string>` to pusty obiekt — dokładnie to, czego
chcemy.

## Hint 4

W runtime typy nie istnieją — pracujesz na stringach. Rozbij wzorzec i ścieżkę po `/`
(odfiltruj puste segmenty z wiodącego ukośnika). Segment zaczynający się od `:` to
parametr, każdy inny musi się zgadzać dosłownie.

## Hint 5

`buildPath` czyta `params` jako `Record<string, string>` (typ generyczny nie da się
indeksować stringiem), więc wprowadź lokalną zmienną:

```ts
const values: Record<string, string> = params;
```

`matchPath` odwrotnie: buduj zwykły `Record<string, string>` i na końcu jedno
`as PathParams<P>`. Nie zapomnij o `encodeURIComponent` / `decodeURIComponent`.
