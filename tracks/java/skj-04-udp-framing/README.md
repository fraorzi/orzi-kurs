# UDP, duplikaty i framing

## Grupa

SKJ

## Kiedy

Gdy datagramy mogą zginąć lub się powtórzyć, a length-prefix chroni granice wiadomości.

## Pułapki

UDP nie daje kolejności ani retry; delimitery mogą wystąpić w payloadzie, a długość musi mieć limit przed alokacją.

## Źródła

- [Java SE 25 networking API](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/module-summary.html)
- [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/)
