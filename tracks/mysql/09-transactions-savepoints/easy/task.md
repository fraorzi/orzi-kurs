# Easy — przenieś saldo atomowo

Przelew między dwoma kontami to trzy zmiany naraz: obciążenie nadawcy,
uznanie odbiorcy i wpis do księgi (`ledger`). Jeżeli proces padnie po
pierwszej zmianie, a przed drugą, pieniądze znikają z jednego konta i nie
pojawiają się na drugim — bank traci spójność ksiąg, a support dostaje
zgłoszenie "gdzie są moje pieniądze". Trzy statementy bez wspólnej
transakcji to trzy niezależne okazje do takiej awarii.

Napisz sekwencję statementów, która w jednej transakcji:

- zmniejsza saldo konta `1` o `30.00`,
- zwiększa saldo konta `2` o `30.00`,
- wstawia do `ledger` jeden wiersz `(from_id=1, to_id=2, amount=30.00)`,
- kończy się `COMMIT`, tak żeby po zakończeniu żadne inne połączenie nie
  widziało pośredniego stanu (tylko obciążone konto, bez uznania) ani
  otwartej, niezakończonej transakcji na tym połączeniu.

Pomiń zmianę salda odbiorcy, a test wykryje to tak samo jak każdy inny
brakujący krok — sekwencja ma być kompletna, nie tylko "wygląda na
transfer".
