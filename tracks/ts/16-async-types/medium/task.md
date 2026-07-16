# Medium — bezpieczny wynik operacji async

Zaimplementuj `captureAsync(operation)`.

Wynik:

```ts
type AsyncResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: { kind: "aborted" | "failed"; message: string } };
```

- sukces zachowuje dokładny `T`,
- `DOMException` o nazwie `"AbortError"` daje kind `"aborted"`,
- zwykły `Error` daje jego message,
- inna rzucona wartość daje `"Unknown error"`,
- wrapper nigdy nie odrzuca Promise.
