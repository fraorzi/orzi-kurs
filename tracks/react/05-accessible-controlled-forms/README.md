# Formularze kontrolowane, walidacja i dostępność

W kontrolowanym polu React jest źródłem prawdy. Input dostaje `value`, a handler
`onChange` zapisuje kolejną wartość:

```tsx
const [email, setEmail] = useState("");

<label>
  E-mail
  <input
    type="email"
    value={email}
    onChange={(event) => setEmail(event.currentTarget.value)}
  />
</label>
```

Dzięki temu przyciski resetu, walidacja i wartości zależne korzystają z tego samego
snapshotu. Pole z `value`, ale bez `onChange`, jest tylko do odczytu.

## Submit i walidacja

Walidację biznesową wykonuj przy submitcie lub w innym jasno określonym momencie.
Handler formularza powinien:

1. zatrzymać domyślne przeładowanie,
2. zbudować błędy z bieżących wartości,
3. przerwać wysłanie, jeśli dane są niepoprawne,
4. przekazać rodzicowi znormalizowane dane.

Nie blokuj wpisywania tylko dlatego, że wartość przejściowo jest niepoprawna. Użytkownik
musi móc dojść od pustego pola do poprawnej wartości.

## Dostępna nazwa i opis błędu

Każde pole potrzebuje widocznej etykiety powiązanej przez zagnieżdżenie albo
`htmlFor` i `id`. Placeholder nie zastępuje etykiety.

Jeśli pojawi się błąd:

- ustaw `aria-invalid="true"`,
- nadaj komunikatowi stabilne `id`,
- połącz pole z komunikatem przez `aria-describedby`.

Dzięki temu nazwa pola i opis błędu tworzą jeden kontrakt także dla technologii
asystujących i testów po dostępnych rolach.

## Focus i komunikaty globalne

Po nieudanym submitcie przenieś focus do pierwszego błędnego pola, szczególnie gdy
formularz jest długi. Podsumowanie błędów może mieć `role="alert"`, ale nie zastępuje
komunikatów przy konkretnych polach.

Focus jest częścią zachowania komponentu. Nie usuwaj obramowania focusu bez
równoważnego, dobrze widocznego zamiennika.

## Kiedy używać

- Używaj kontrolowanych pól, gdy ich wartości wpływają na inne UI, walidację lub reset.
- Waliduj na granicy operacji biznesowej i pokazuj błąd przy polu, którego dotyczy.
- Normalizuj dane dopiero przy submitcie, jeśli użytkownik powinien widzieć własny zapis.

## Kiedy unikać

- Nie używaj placeholdera jako jedynej nazwy pola.
- Nie pokazuj błędu od pierwszego znaku, jeśli nie pomaga to realnie wykonać zadania.
- Nie wyłączaj przycisku submit bez wyjaśnienia, co trzeba poprawić.

## Pułapki

- Przełączenie inputa między `undefined` i stringiem zmienia go z uncontrolled na
  controlled lub odwrotnie.
- Sam czerwony kolor nie przekazuje treści błędu ani jego związku z polem.
- `role="alert"` na każdym znaku może tworzyć hałaśliwe komunikaty.
- Walidacja klienta poprawia UX, ale serwer nadal musi walidować nieufne dane.

## Źródła

- <https://react.dev/learn/reacting-to-input-with-state>
- <https://www.w3.org/WAI/tutorials/forms/labels/>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
