# Modal usuwania konta z pełnym zarządzaniem focusem

Zaimplementuj `DeleteAccountDialog`.

Przycisk `Usuń konto` otwiera przez portal modal nazwany `Usuń konto?`.

- Dialog ma `role="dialog"`, `aria-modal="true"` i nazwę od widocznego nagłówka.
- Po otwarciu focus trafia na najmniej destrukcyjny przycisk `Anuluj`.
- Tab z ostatniego elementu zawija do pierwszego, Shift+Tab z pierwszego do ostatniego.
- Escape i `Anuluj` zamykają dialog.
- `Potwierdź usunięcie` wywołuje `onConfirm` i zamyka dialog.
- Po każdym zamknięciu focus wraca do triggera `Usuń konto`.
