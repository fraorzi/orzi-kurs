# Servlet, JMS i EJB w kontekście

## Grupa

TPO

## Kiedy

Gdy trzeba rozpoznać granice request/session, transakcję kontenera i historyczną rolę komponentów Jakarta.

## Pułapki

Stan użytkownika w singletonie miesza sesje; transakcja nie obejmuje automatycznie zewnętrznego HTTP, a delivery JMS może się powtórzyć.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
