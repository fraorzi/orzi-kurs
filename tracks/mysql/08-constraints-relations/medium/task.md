# Dobierz politykę ON DELETE

Zaprojektuj customers/orders: usunięcie klienta z zamówieniem ma być zabronione, a usunięcie zamówienia ma kaskadowo usunąć items.

Zapytanie musi działać przy domyślnym rygorystycznym sql_mode MySQL 8.4.
