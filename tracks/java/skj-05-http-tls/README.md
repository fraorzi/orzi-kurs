# HttpClient, timeout i TLS

## Grupa

SKJ

## Kiedy

Gdy klient HTTP ma jawny timeout, redirect policy i nie obniża bezpieczeństwa certyfikatów.

## Pułapki

Brak timeoutu może zawiesić worker; automatyczne retry POST grozi duplikatem, a trust-all SSL wyłącza uwierzytelnienie.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
