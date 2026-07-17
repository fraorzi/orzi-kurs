# DNS, HTTP, SMTP i protokoły tekstowe

## Grupa

SKJ

## Kiedy

Gdy parser protokołu ma rozpoznać request line, ograniczyć długość i nie mylić framingu z treścią.

## Pułapki

Czytanie `readLine` bez limitu umożliwia DoS; HTTP status nie jest wyjątkiem transportu, a DNS cache musi respektować TTL.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
