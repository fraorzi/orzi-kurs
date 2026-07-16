# Usuń waterfall z dashboardu

Podsumowanie i alerty pochodzą z niezależnych źródeł. Obecny `loadDashboard`
czeka na podsumowanie, zanim w ogóle rozpocznie pobieranie alertów.

Uruchom obie operacje współbieżnie i zwróć `DashboardData` dopiero po otrzymaniu
obu wyników. Nie zmieniaj publicznych typów ani komponentu strony.
