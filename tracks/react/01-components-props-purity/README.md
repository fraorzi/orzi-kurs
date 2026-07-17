# Komponenty, props i czystość renderowania

Komponent Reacta jest funkcją, która dla danych wejściowych zwraca opis UI. Props
są argumentem tej funkcji. Rodzic przekazuje dane w dół, a komponent nie powinien
ich zmieniać ani zapisywać efektów ubocznych podczas renderowania.

```tsx
interface UserBadgeProps {
  readonly name: string;
  readonly role: "admin" | "member";
}

export function UserBadge({ name, role }: UserBadgeProps) {
  return (
    <article aria-label={`Użytkownik ${name}`}>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

Nazwy komponentów zaczynają się wielką literą. Małe litery oznaczają elementy
platformy (`button`, `section`, `input`). Komponent można zagnieżdżać jak własny
element JSX.

## Props są tylko do odczytu

Props opisują konkretny render. Zmiana `props.name = ...` łamie jednokierunkowy
przepływ danych i utrudnia zrozumienie, kto jest właścicielem wartości. W TypeScript
oznaczaj pola propsów jako `readonly`.

Domyślne wartości podawaj podczas destrukturyzacji:

```tsx
interface NoticeProps {
  readonly tone?: "info" | "warning";
}

function Notice({ tone = "info" }: NoticeProps) {
  return <p data-tone={tone}>...</p>;
}
```

## Kompozycja przez `children`

Komponent opakowujący nie musi znać zawartości. Przyjmuje `children: ReactNode`
i odpowiada za wspólną strukturę:

```tsx
interface PanelProps {
  readonly title: string;
  readonly children: ReactNode;
}

function Panel({ title, children }: PanelProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

To zwykle elastyczniejsze niż dodawanie kolejnych propsów typu `bodyText`,
`buttonLabel`, `iconName`.

## Czysty render

Ten sam zestaw propsów powinien dawać ten sam JSX. Podczas renderu:

- nie mutuj propsów ani obiektów otrzymanych z zewnątrz,
- nie zapisuj do zmiennych modułowych,
- nie wykonuj żądań i subskrypcji,
- nie opieraj wyniku na `Date.now()` lub `Math.random()`.

Sortowanie przez `array.sort()` mutuje tablicę. Dla propsów użyj kopii
`[...items].sort(...)` albo `toSorted(...)`.

## Kiedy używać

- Dziel UI na komponenty, gdy fragment ma własny kontrakt, nazwę domenową albo jest
  używany w kilku miejscach.
- Używaj `children`, gdy rodzic ma kontrolować zawartość, a komponent jedynie ramę.
- Trzymaj transformacje danych w renderze, jeśli są czyste i tanie.

## Kiedy unikać

- Nie twórz komponentu dla każdego pojedynczego taga bez znaczenia domenowego.
- Nie kopiuj wszystkich propsów do lokalnych zmiennych tylko po to, by je przemianować.
- Nie używaj `React.FC` jako obowiązkowej konwencji; jawny typ propsów jest prostszy
  i nie sugeruje automatycznie `children`.

## Pułapki

- Wywołanie `<Button onClick={handleClick()} />` uruchamia funkcję w renderze;
  zwykle trzeba przekazać `handleClick`.
- Mutacja tablicy propsów może zmienić dane rodzica bez wywołania settera.
- Zmienna modułowa współdzieli stan między wszystkimi instancjami komponentu.
- `children` może być tekstem, liczbą, fragmentem, tablicą lub `null`, nie tylko
  pojedynczym elementem.

## Źródła

- <https://react.dev/learn/your-first-component>
- <https://react.dev/learn/passing-props-to-a-component>
- <https://react.dev/learn/keeping-components-pure>
