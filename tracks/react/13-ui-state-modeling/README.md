# Modelowanie UI jako rozłącznych stanów

Kilka niezależnych booleanów szybko tworzy kombinacje, których interfejs nigdy nie
powinien osiągnąć:

```tsx
const [isPending, setIsPending] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [hasError, setHasError] = useState(false);
```

Osiem kombinacji tych flag obejmuje m.in. jednoczesny pending, sukces i błąd.
Zamiast tego nazwij rzeczywiste stany widoku:

```tsx
type State =
  | { readonly status: "editing"; readonly email: string }
  | { readonly status: "pending"; readonly email: string }
  | { readonly status: "success"; readonly invitedEmail: string }
  | {
      readonly status: "error";
      readonly email: string;
      readonly message: string;
    };
```

Pole `status` zawęża dane dostępne w każdej gałęzi. Sukces nie ma przypadkowego
komunikatu błędu, a error zawsze go ma.

## Najpierw narysuj stany i przejścia

Przed implementacją większej interakcji wypisz:

- wszystkie widoczne stany,
- zdarzenia przechodzące między nimi,
- przejścia niedozwolone,
- dane potrzebne do retry lub powrotu.

Reducer dobrze pasuje do state machine, jeśli wiele zdarzeń zmienia rozłączną unię.
Nie potrzebujesz biblioteki state machine dla każdego formularza, ale potrzebujesz
świadomości, że nie każda akcja jest legalna w każdym stanie.

## Stan danych i stan widoku

`empty` nie zawsze jest tym samym co `success` z pustą tablicą. Jeśli UI, analityka
lub dostępne akcje są inne, wartość zasługuje na osobny stan.

Z drugiej strony nie twórz statusu dla każdej pochodnej flagi. `isEmpty` można
wyliczyć z gotowych danych, jeśli nie reprezentuje odrębnego przejścia.

## Async i retry

Przy rozpoczęciu operacji zachowaj dane potrzebne do retry. Po sukcesie stan może
mieć zupełnie inny kształt, np. tylko `orderId`. Po błędzie przechowaj komunikat i
dane formularza, aby użytkownik mógł poprawić lub ponowić operację.

Nieaktualne odpowiedzi nadal wymagają ochrony opisanej w fetch effects. Sama unia
nie rozwiązuje race condition, ale uniemożliwia wiele sprzecznych kombinacji UI.

## Kiedy używać

- Dla procesów z pending/success/error i różnymi dostępnymi akcjami.
- Gdy kilka booleanów wymaga komentarzy o niedozwolonych kombinacjach.
- Gdy reducer ma pilnować legalnych przejść domenowych.

## Kiedy unikać

- Nie buduj rozbudowanej maszyny dla prostego lokalnego toggle.
- Nie zapisuj pochodnych flag obok statusu.
- Nie pozwalaj, by komponent renderował dane, których dany wariant unii nie posiada.

## Pułapki

- Opcjonalne pola w jednym interfejsie nie dają takich gwarancji jak unia rozłączna.
- Akcja sukcesu zaakceptowana w stanie `cart` oznacza brak guardów przejść.
- Błąd bez zachowanego inputu utrudnia retry i poprawę danych.
- Reset wszystkich pól po błędzie może być technicznie prosty, ale fatalny dla UX.

## Źródła

- <https://react.dev/learn/reacting-to-input-with-state>
- <https://react.dev/learn/choosing-the-state-structure>
- <https://react.dev/learn/extracting-state-logic-into-a-reducer>
