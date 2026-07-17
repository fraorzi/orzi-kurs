# Zrób audyt wieloinstancyjnego deploymentu

Zaimplementuj `auditDeployment`. Dla jednej instancji wymagaj reverse proxy i drain
10–30 s. Dla wielu dodatkowo wymagaj: jednego build ID, `deploymentId`, wspólnego
klucza Server Actions, shared cache oraz koordynacji tagów.

Jeśli streaming jest włączony, wymagaj wyłączonego buforowania proxy. Jeśli runtime
to `static-export`, zgłoś błąd dla Actions, Proxy albo streamingu. Zwróć stabilną
tablicę kodów problemów w kolejności opisanej wyżej, bez duplikatów.
