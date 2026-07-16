# Context, provider React 19 i granice aktualizacji

Context udostępnia wartość całej podgałęzi bez przekazywania jej przez każdy
komponent pośredni:

```tsx
const LocaleContext = createContext<Locale>("pl");

function LocaleProvider({ locale, children }: Props) {
  return (
    <LocaleContext value={locale}>
      {children}
    </LocaleContext>
  );
}
```

Od React 19 obiekt contextu renderuje się bezpośrednio jako provider.
`<SomeContext.Provider>` pozostaje starszą składnią dla wcześniejszych wersji.

## Najbliższy provider wygrywa

`useContext(SomeContext)` czyta wartość najbliższego providera tego contextu powyżej
komponentu. Provider zagnieżdżony może jawnie nadpisać wartość dla fragmentu drzewa.

Default przekazany do `createContext` jest statycznym fallbackiem, a nie stanem.
Jeśli użycie bez providera jest błędem architektury, wybierz `null` i ukryj sprawdzenie
w custom hooku:

```tsx
function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession wymaga SessionProvider");
  }
  return session;
}
```

## Context nie zastępuje wszystkich propsów

Props pozostają jawne i dobrze dokumentują lokalny kontrakt. Context sprawdza się
dla danych przekrojowych albo współdzielonych przez odległe komponenty: sesji,
motywu, konfiguracji ekranu czy state/dispatch konkretnej funkcji.

Zanim dodasz context, sprawdź, czy kompozycja przez `children` nie wystarczy.

## Aktualizacje i wydajność

Każdy konsument danego contextu renderuje się po zmianie jego `value` według
`Object.is`. Obiekt `{ state, actions }` tworzony przy każdym renderze zmienia identity
i aktualizuje również komponenty potrzebujące wyłącznie akcji.

Przy reducerze często warto rozdzielić:

- context stanu, który zmienia się wraz z danymi,
- context stabilnego `dispatch`, którego identity React zachowuje.

Nie dziel contextów mechanicznie. Granica powinna odpowiadać różnym wzorcom odczytu
i zmiany.

## Kiedy używać

- Gdy wiele odległych komponentów potrzebuje tej samej wartości.
- Dla providera funkcji domenowej łączącego reducer i custom hooki.
- Dla nadpisywalnej konfiguracji poddrzewa.

## Kiedy unikać

- Nie ukrywaj lokalnych zależności, które czytelniej przekazać jednym propsem.
- Nie umieszczaj całego stanu aplikacji w jednym stale zmieniającym się context value.
- Nie dawaj fikcyjnego defaultu, jeśli brak providera ma być błędem.

## Pułapki

- Provider musi znajdować się wyżej niż komponent wywołujący `useContext`.
- Dwa contexty utworzone osobnymi wywołaniami `createContext` nie są tym samym
  contextem, nawet jeśli mają identyczny default.
- Nowy obiekt `value` aktualizuje konsumentów niezależnie od tego, którego pola używają.
- Context utrudnia ponowne użycie komponentu, jeśli nie zapewnisz małego providera
  testowego lub jawnego fallbacku.

## Źródła

- <https://react.dev/reference/react/createContext>
- <https://react.dev/reference/react/useContext>
- <https://react.dev/learn/passing-data-deeply-with-context>
- <https://react.dev/learn/scaling-up-with-reducer-and-context>
- <https://react.dev/blog/2024/12/05/react-19>
