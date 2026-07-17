# Konsola kolejki zgłoszeń

Dokończ wieloplikowy `OperationsConsole` w katalogu `src/`.

## Cache i dane

- `ticketKeys.list(status)` ma zawierać status i dziedziczyć prefiks `ticketKeys.all`.
- Query przekazuje `AbortSignal` do `fetchTickets` i uznaje dane za świeże przez minutę.
- Powrót do odwiedzonego filtra nie wykonuje kolejnego requestu.
- Rekordy są identyfikowane przez `ticket.id`, nigdy indeks.

## Dostępny filtr

`TicketTabs` implementuje tablistę z dwoma tabami: Otwarte i Rozwiązane.
Aktywny tab ma `aria-selected=true` i `tabIndex=0`, drugi `tabIndex=-1`.
Strzałki lewo/prawo cyklicznie aktywują i fokusują sąsiedni tab. Lista jest
powiązanym `tabpanel`.

## Wiersze i dynamiczny token

Każdy wiersz zachowuje statyczną klasę `.ticket-row`, a priorytet przekazuje przez
typowany token `--priority-accent`. Nie ustawiaj końcowego `backgroundColor` w JSX.

## Dialog

Akcja przypisania otwiera nazwany dialog. Fokus trafia do wyboru agenta. Escape i
Anuluj zamykają dialog, a po zamknięciu fokus wraca do przycisku, który go otworzył.

## Optimistic assignment

Po zatwierdzeniu dialog znika, a agent jest natychmiast widoczny w aktywnej liście.
W `onMutate` anuluj dokładne query, zapisz snapshot i zmień odpowiedni rekord.
Po błędzie przywróć snapshot i pokaż alert. W `onSettled` unieważnij prefiks
`ticketKeys.all`, aby zsynchronizować wszystkie listy.

Nie kopiuj danych query do `useState` i nie twórz `QueryClient` w komponencie.
