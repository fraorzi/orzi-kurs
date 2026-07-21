# Easy — zbuduj domyślną rolę tylko do odczytu

Dashboard analityczny łączy się z bazą kontem serwisowym, które dziś ma
pełny dostęp (`GRANT ALL ON *.*`) — pozostałość po szybkim postawieniu
środowiska. Incydent w sąsiednim zespole pokazał, że wyciek hasła do
takiego konta daje atakującemu zapis i `DROP` na całej instancji, nie tylko
odczyt raportów.

Przepisz `starter.sql` na wersję least-privilege:

- utwórz rolę `orzi_app_reader` z wyłącznie `SELECT` na `app_data.*` —
  żadnego innego schematu, żadnego zapisu,
- przypisz rolę kontu `orzi_app_api'@'localhost'`,
- ustaw rolę jako **domyślną** dla tego konta — samo `GRANT roleX TO user`
  nie aktywuje roli przy logowaniu,
- konto samo w sobie nie powinno mieć żadnych uprawnień poza `USAGE` —
  dostęp ma płynąć wyłącznie z członkostwa w roli.

Test sprawdza stan metadanych serwera (`information_schema`,
`mysql.role_edges`, `mysql.default_roles`), nie treść zapytania — rola
przypisana, ale nieaktywowana jako domyślna, daje dokładnie ten sam (zerowy)
efektywny dostęp co jej brak.
