## Hint 1

Klasa abstrakcyjna deklaruje, czego wymaga od podklas, i dostarcza wspólną logikę:

```ts
export abstract class Shape implements Describable {
  abstract readonly kind: string;
  abstract area(): number;

  describe(): string {
    return `${this.kind}: ${this.area().toFixed(2)}`;
  }
}
```

`describe` zostaje **tylko tutaj** — podklasy nie mają go nadpisywać (test to sprawdza).

## Hint 2

Podklasa wypełnia kontrakt polem i metodą:

```ts
export class Circle extends Shape {
  readonly kind = "circle";
  constructor(private readonly radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

`super()` w konstruktorze podklasy jest obowiązkowe przed użyciem `this`.

## Hint 3

`Square` dziedziczy po `Rectangle`, a nie po `Shape` — dzięki temu `s instanceof Rectangle`
to `true`, a pole liczy się bez powtarzania kodu:

```ts
constructor(side: number) {
  super(side, side);
}
```

Nadpisując `kind`, zadeklaruj go jako `kind: string` (nie `"square"` jako typ literalny) —
inaczej typ pola w `Rectangle` (`"rectangle"`) i w `Square` się nie zgodzą.

## Hint 4

`largest` bez `sort` (bo `sort` mutuje wejście, a wejście jest `readonly`): jedna pętla
z zapamiętanym najlepszym elementem. Warunek `>` (a nie `>=`) sprawia, że przy remisie
zostaje pierwszy — dokładnie tego wymaga treść.
