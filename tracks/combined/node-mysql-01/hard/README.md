# node+mysql — transakcyjna warstwa danych z retry

Projekt łączy warstwę Node (logika retry, kontrakt transakcji) z semantyką
MySQL (deadlocki InnoDB). Modeluje realny problem: pod współbieżnym zapisem
InnoDB wykrywa deadlock i wybiera jedną transakcję jako ofiarę, zwracając
`ER_LOCK_DEADLOCK` (errno 1213). To błąd **przejściowy** — poprawną reakcją
jest ponowienie całej transakcji, nie przerwanie żądania.

Kontrakt `transact(tx)` przyjmuje wstrzyknięte granice (`begin`, `work`,
`commit`, `rollback`), dzięki czemu logika retry testuje się deterministycznie
bez prawdziwej bazy — a te same wywołania w produkcji mapują się na sterownik
mysql2.

## Kontekst

Warstwa danych usługi wykonuje wieloetapowe zapisy w transakcji. Przy dwóch
równoległych żądaniach dotykających tych samych wierszy w odwrotnej kolejności
InnoDB zdeadlockuje jedno z nich. Bez retry użytkownik dostaje losowy błąd
500; z retry — ponowienie całej sekcji (begin→work→commit) załatwia sprawę,
bo druga transakcja zdążyła się już zamknąć.

## Decyzje

- **Retry tylko dla `ER_LOCK_DEADLOCK`.** Inne błędy (naruszenie constraintu,
  zła składnia) są trwałe — ponawianie ich to zapętlenie. Kod błędu jest
  jedynym sygnałem, po którym wolno ponowić.
- **Ponawiamy całą transakcję, nie samo `work`.** Po deadlocku InnoDB wycofuje
  transakcję w całości; retry musi zacząć od nowego `begin`, inaczej pracuje
  na wycofanym stanie.
- **Zawsze `rollback` przed retry.** Nawet gdy silnik już wycofał, jawny
  rollback czyści stan po stronie sterownika i jest idempotentny.
- **Skończony limit prób (3).** Po wyczerpaniu rethrow — decyzję o dalszym
  postępowaniu podejmuje warstwa wyżej, retry nie może być nieskończony.

## Pułapki

- Retry `work()` bez ponownego `begin`/`rollback` pracuje na martwej
  transakcji — MySQL odrzuci zapisy albo zwróci nieaktualne dane.
- Ponawianie każdego błędu (nie tylko deadlocku) zamienia trwałą awarię
  w nieskończoną pętlę.
- Brak limitu prób = zawieszenie żądania przy uporczywym konflikcie.
- Sprawdzanie komunikatu błędu zamiast kodu jest kruche — kody (`ER_LOCK_DEADLOCK`,
  errno 1213) są stabilnym kontraktem, treść komunikatu nie.

## Źródła (audyt 2026-07-20)

- [MySQL 8.4: Deadlocks in InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html)
- [MySQL 8.4: Server error reference (1213 ER_LOCK_DEADLOCK)](https://dev.mysql.com/doc/mysql-errors/8.4/en/server-error-reference.html)
- [mysql2: transakcje i połączenia](https://sidorares.github.io/node-mysql2/docs)
